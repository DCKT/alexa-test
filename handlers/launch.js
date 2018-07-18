const LaunchRequestHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle (handlerInput) {
    const speechText = 'Requête lancement : bonjour Julie'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('test', speechText)
      .getResponse()
  }
}

module.exports = { LaunchRequestHandler }
