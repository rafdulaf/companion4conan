About = mergeObject(About, {
    _i18n: {
        'fr': {
            'smallName': "Conan",
            'name': "Compagnon<br/>de Conan",
            'title': "Le compagnon de Conan",
            'text': "'Compagnion de Conan' est une application indépendante pour accompagner les joueurs dans le jeu de plateau 'Conan de Monolith'.<h1>Important</h1>Cette application est réalisée par des fans avec l'aimable autorisation de <a href='https://www.facebook.com/frederic.henry1/'>Frédéric Henry</a> et le soutient de l'édteur du jeu Conan : Monolith.<br/>Elle a été réalisée par <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a> en s'appuyant sur l'aide de la communauté de <a href='https://the-overlord.com'>The Overlord</a> et divers outils et ressources existantes.",
            'copyright-text': "'Conan' est un jeu de plateau de figurines édité par <a href='http://monolithedition.com' target='_blank'>Monolith</a>.<br/>"
                    + "Le logo Conan et les polices de caractères utilisées sont la propriété de Monolith.<br/>"
                    + "L'image du 'Compagnion de Conan' a été créée à partir du logo Conan.<br/>",
            'tolink': "https://the-overlord.com/index.php?/topic/3095-application-de-compagnon-de-jeu/",

            'contribute_hof_dataIT': "(traduction italienne)"
        },
        'en': {
            'smallName': "Conan",
            'name': "Companion<br/>to Conan",
            'title': "The companion to Conan",
            'text': "'Companion to Conan' is an independant application to help the players in the boardgame 'Conan by Monolith'.<h1>Disclamer</h1>This application is made by fans with the kind authorization of <a href='https://www.facebook.com/frederic.henry1/'>Frédéric Henry</a> and the support of Monolith (producer of the game Conan).<br/>It was realized by <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a> relying the community of <a href='https://the-overlord.com'>The Overlord</a> and several existing tools or resources.",
            'copyright-text': "'Conan' is a board game published by <a href='http://monolithedition.com' target='_blank'>Monolith</a>.<br/>"
                    + "The Conan logo and the fonts used are the property of Monolith.<br/>"
                    + "The image of 'Companion to Conan' was created by adapting the Conan logo.<br/>",
            'tolink': "https://the-overlord.net/index.php?/topic/756-companion-application-for-conan/",

            'contribute_hof_dataIT': "(italian translation)"
        },
        'it': {
            'smallName': "Conan",
            'name': "Conan<br/>Companion",
            'title': "Conan Companion",
            'text': "'Conan Companion' è un'applicazione indipendente di supporto per i giocatori del gioco 'Conan di Monolith'.<h1>Importante</h1>Questa applicazione è fatta da fans con l'autorizzazione di <a href='https://www.facebook.com/frederic.henry1/'>Frédéric Henry</a> e il supporto di Monolith (produttore del gioco di Conan).<br/>Realizzata da <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a> facendo affidamento alla comunità di <a href='https://the-overlord.com'>The Overlord</a> e usando numerosi tools esistenti e risorse.",
            'copyright-text': "'Conan' è un gioco da tavolo della <a href='http://monolithedition.com' target='_blank'>Monolith</a>.<br/>"
                    + "Il logo di Conan e i fonts usati sono proprietà della Monolith.<br/>"
                    + "Le immagini di 'Conan Companion' sono state create adattando il logo di Conan.<br/>",
            'tolink': "https://the-overlord.net/index.php?/topic/756-companion-application-for-conan/",

            'contribute_hof_dataIT': "(traduzione italiana)"
        }
    },

    _haf: function() {
        return {
            'coders' : "<div><a href=\"https://the-overlord.com/index.php?/profile/5240-cochon/\" target='_blank'>@cochon</a></div>",
            'relooking' : "<div><a href=\"https://the-overlord.com/index.php?/profile/5236-renand/\" target='_blank'>@Renand</a></div>",
            'data': "<div><a href=\"https://the-overlord.com/index.php?/profile/5240-cochon/\" target='_blank'>@cochon</a></div>"
                    + "<div><a href=\"https://the-overlord.net/index.php?/profile/6029-pensareadaltro/\" target='_blank'>@pensareadaltro</a> " + About._i18n[Language].contribute_hof_dataIT + "</div>",
            'tests': "<div><a href=\"https://the-overlord.com/index.php?/profile/5567-madcollector/\" target='_blank'>@madcollector</a></div>"
                     + "<div><a href=\"https://the-overlord.com/index.php?/profile/13-roolz/\" target='_blank'>@Roolz</a></div>"
                     + "<div><a href=\"https://the-overlord.com/index.php?/profile/5236-renand/\" target='_blank'>@Renand</a></div>"
        }
    }
});
