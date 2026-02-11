import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const KOMMO_ACCESS_TOKEN = Deno.env.get('KOMMO_ACCESS_TOKEN');
    const rawDomain = Deno.env.get('KOMMO_API_DOMAIN') || 'api-g.kommo.com';
    const KOMMO_API_DOMAIN = rawDomain.replace(/^https?:\/\//, '').replace(/\/+$/, '');

    if (!KOMMO_ACCESS_TOKEN) {
      throw new Error('KOMMO_ACCESS_TOKEN não configurado');
    }

    const leadData = await req.json();
    console.log('Dados recebidos:', JSON.stringify(leadData));

    const {
      fullName,
      whatsapp,
      propertyType,
      creditAmount,
      downPaymentAmount,
      monthlyPayment,
      city,
    } = leadData;

    // Clean phone number - keep only digits and add country code
    const cleanPhone = whatsapp.replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.startsWith('55') ? cleanPhone : `55${cleanPhone}`;

    // Build note text with all lead details
    const noteText = [
      `Tipo de Bem: ${propertyType}`,
      `Valor Pretendido: ${creditAmount}`,
      `Valor de Entrada: ${downPaymentAmount || 'Não tem'}`,
      `Parcela Ideal: ${monthlyPayment}`,
      `Cidade: ${city}`,
    ].join('\n');

    // Pipeline "Tráfego Pago" and stage "Etapa de leads de entrada"
    const PIPELINE_ID = 12050999;
    const STATUS_ID = 92979627;

    // Create lead with embedded contact using /leads/complex endpoint
    const kommoPayload = [
      {
        name: `${propertyType} - ${fullName}`,
        pipeline_id: PIPELINE_ID,
        status_id: STATUS_ID,
        tags: [
          { name: 'SIMULADOR MALTA' },
        ],
        _embedded: {
          contacts: [
            {
              first_name: fullName,
              custom_fields_values: [
                {
                  field_code: 'PHONE',
                  values: [
                    {
                      value: phoneWithCountry,
                      enum_code: 'WORK',
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    ];

    console.log('Enviando para Kommo:', JSON.stringify(kommoPayload));

    const kommoResponse = await fetch(
      `https://${KOMMO_API_DOMAIN}/api/v4/leads/complex`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${KOMMO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kommoPayload),
      }
    );

    const responseText = await kommoResponse.text();
    console.log('Resposta Kommo:', kommoResponse.status, responseText);

    if (!kommoResponse.ok) {
      throw new Error(`Kommo API error: ${kommoResponse.status} - ${responseText}`);
    }

    let kommoResult;
    try {
      kommoResult = JSON.parse(responseText);
    } catch {
      kommoResult = { raw: responseText };
    }

    // Add note to the created lead
    if (kommoResult?.[0]?.id) {
      const leadId = kommoResult[0].id;
      const notePayload = [
        {
          note_type: 'common',
          params: {
            text: noteText,
          },
        },
      ];

      const noteResponse = await fetch(
        `https://${KOMMO_API_DOMAIN}/api/v4/leads/${leadId}/notes`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${KOMMO_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(notePayload),
        }
      );
      const noteResponseText = await noteResponse.text();
      console.log('Nota adicionada:', noteResponse.status, noteResponseText);
    }

    return new Response(JSON.stringify({ success: true, data: kommoResult }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Erro na edge function send-to-kommo:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
