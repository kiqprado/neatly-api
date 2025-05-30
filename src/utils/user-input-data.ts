export const UserInputDataRegex = {
  introduction_neatly: {
    pt: /(?:apresente\s?-?\s?se|apresenta\s?-?\s?se|se\s+apresente|se\s+apresenta|quem\s+(?:é|e|eh|são)\s+(?:vc|voce|você|voces|vcs)(?:\s+mesmo)?\??|me\s+(?:fale|conte|diga|explique)\s+(?:um\s+pouco\s+)?(?:sobre|da?o?)\s+(?:vc|voce|você)|qual\s+(?:é|e|são)\s+(?:sua|suas|seu)\s+(?:função|funções|identidade|hist[óo]rico?|origem)|poderia\s+(?:se\s+)?apresentar(?:\s?-?\s?se)?)/i,
    en: /(?:introduce\s+yourself|describe\s+yourself|who\s+are\s+you\??|what\s+are\s+you\??|tell\s+me\s+(?:about\s+)?yourself|your\s+(?:identity|function|purpose)|can\s+you\s+introduce\s+yourself|brief\s+introduction)/i,
    es: /(?:preséntate|quién\s+(?:eres|erres?)\s+tú\??|cuéntame\s+(?:un\s+poco\s+)?de\s+ti|hablame\s+de\s+ti|tu\s+(?:identidad|función|propósito)|puedes\s+presentarte|introducción\s+breve|quién\s+(?:es|son)\s+(?:usted|ustedes)\??|dime\s+algo\s+de\s+ti)/i
  },

  intro: {
    pt: /(?:^|\s)(oi|olá|ola|e\s+a[íi]|opa|e\s+aew|iae|fala\s+a[íi]|salve|boa\s+(?:tarde|noite|dia))(?:$|\s|!|\?|,|\.)/i,
    en: /(?:^|\s)(hi|hello|hey|what's?\s+up|howdy|greetings|yo|sup|good\s+(?:morning|afternoon|evening))(?:$|\s|!|\?|,|\.)/i,
    es: /(?:^|\s)(hola|buen\s+(?:día|as\s+tardes|as\s+noches)|qué\s+hubo|qué\s+hace|qué\s+tal|buenas|ey|epa|alo)(?:$|\s|!|\?|,|\.)/i
  },

  organize: {
    pt: /(?:^|\s)(organiz[ae]r?|listar?|ordenar|arrumar|classificar|montar|fazer\s+(?:uma\s+)?lista)(?:\s+(?:a|o|os|as|de|para|minha|meu))?(?:$|\s|!|\?|,|\.)/i,
    en: /(?:^|\s)(organize?|list|arrange|sort|classify|make\s+(?:a\s+)?list|set\s+up)(?:\s+(?:the|my|our|a))?(?:$|\s|!|\?|,|\.)/i,
    es: /(?:^|\s)(organizar|listar?|ordenar|clasificar|hacer\s+(?:una\s+)?lista|arreglar|preparar)(?:\s+(?:la|el|los|las|de|mi|nuestro))?(?:$|\s|!|\?|,|\.)/i
  },

  ready: {
    pt: /(?:^|\s)(pronto|tá\s+pronto|terminei|acabou|finalizei|conclu[íi]|fiz\s+tudo|completei|está\s+feito|finalizado)(?:$|\s|!|\?|,|\.)/i,
    en: /(?:^|\s)(ready|done|finished|completed|all\s+set|all\s+done|it's\s+done|that's\s+it|got\s+it|i'm\s+done|i'm\s+finished)(?:$|\s|!|\?|,|\.)/i,
    es: /(?:^|\s)(listo|terminé|acabé|finalicé|completé|he\s+terminado|ya\s+está|está\s+hecho|finalizado)(?:$|\s|!|\?|,|\.)/i
  },

  status_check: {
    pt: /(?:^|\s)(já\s+fez\??|já\s+terminou\??|(?:ta|está)\s+fazendo\??|cadê\??|onde\s+está\??|já\s+pronto\??|já\s+concluiu\??|e\s+aí\??|progresso\??)(?:$|\s|!|\?|,|\.)/i,
    en: /(?:^|\s)((?:is\s+it\s+)?done\??|(?:are\s+)?you\s+done\??|(?:are\s+)?you\s+working\s+on\s+it\??|where\s+is\s+it\??|(?:what'?s|what\s+is)\s+the\s+status\??|progress\??|how'?s\s+it\s+going\??|any\s+updates\??)(?:$|\s|!|\?|,|\.)/i,
    es: /(?:^|\s)(ya\s+lo\s+hiciste\??|ya\s+terminaste\??|estás\s+haciéndolo\??|dónde\s+está\??|ya\s+está\s+listo\??|cuál\s+es\s+el\s+estado\??|progreso\??|cómo\s+vamos\??|hay\s+actualizaciones\??)(?:$|\s|!|\?|,|\.)/i
  }
}