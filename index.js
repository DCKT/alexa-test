const Alexa = require('ask-sdk')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
let skill

const { LaunchRequestHandler } = require('./handlers/launch')
const { SessionEndedRequestHandler } = require('./handlers/sessionEndup')
const { CancelAndStopIntentHandler } = require('./handlers/sessionEndup')
const { HelpIntentHandler } = require('./handlers/helpIntent')

const HelloWorldIntentHandler = {
  canHandle (handlerInput) {
    if (handlerInput.requestEnvelope.request.intent) {
      console.log(handlerInput.requestEnvelope.request.intent.name)
    }
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'HelloIntent'
    )
  },
  handle (handlerInput) {
    const speechText = 'Bonjour le monde !'

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse()
  }
}

const PlaceIntentHandler = {
  canHandle (handlerInput) {
    if (handlerInput.requestEnvelope.request.intent) {
      console.log(handlerInput.requestEnvelope.request.intent.name)
    }
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'PlaceIntent'
    )
  },
  handle (handlerInput) {
    const speechText = 'Ceci est un test'
    console.log(handlerInput.requestEnvelope.request.intent.slots.place)
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse()
  }
}

app.use(bodyParser.json())
app.post('/', function (req, res) {
  if (!skill) {
    skill = Alexa.SkillBuilders.custom()
      .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        PlaceIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
      )
      .create()
  }

  skill
    .invoke(req.body)
    .then(function (responseBody) {
      res.json(responseBody)
    })
    .catch(function (error) {
      console.log(error)
      res.status(500).send('Error during the request')
    })
})

app.listen(3000, function () {
  console.log('Development endpoint listening on port 3000!')
})
