const AirtablePlus = require('airtable-plus')
const airtable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASE_ID,
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: 'Instruments',
})

exports.handler = async event => {
  try {
    const body = JSON.parse(event.body)

    const missingFields = requiredFields.filter(f => body[f] == undefined)
    if(missingFields.length > 0) res({ required: missingFields }, 422)

    const {
      fields: {
        instrument_name,
        score_flexibility,
        score_durability,
        score_practicality,
        score_complexity,
        score_compatibility
      }
    } = await airtable.create(body)

    return res({
      instrument_name,
      score_flexibility,
      score_durability,
      score_practicality,
      score_complexity,
      score_compatibility
    })
  } catch (err) {
    return res(err, 500)
  }
}

function res(body, statusCode = 200) {
  return { statusCode, body: JSON.stringify(body) }
}

const requiredFields = [
  "submitter_name", "submitter_email", "instrument_name", "instrument_description", "instrument_manufacturer", "instrument_public", "midi", "setup", "preset", "wireless", "independent_use", "mountable", "sensitivity_adjust", "store_settings", "interface_adapt", "color_change", "high_contrast", "screenreader", "damage", "use_period_2h", "protective_accessories", "control_consistency", "adapters", "practice_performance", "various_feedbacks", "hide_distractions"
]
