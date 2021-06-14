Encyclopedia = mergeObject(Encyclopedia, {
    _loadItems: function() {
        Encyclopedia._items = [EncyclopediaHeroes, EncyclopediaTiles, EncyclopediaEquipments, EncyclopediaSpells, EncyclopediaModels, EncyclopediaTokens];
    },
        
    load: function()
    {
        return Promise.all([
            Utils.loadJSON("data/skills.json")      .then(function(data) { Encyclopedia.skills = data; }),
            Utils.loadJSON("data/spells.json")      .then(function(data) { Encyclopedia.spells = Encyclopedia._loadDeemphasize(data, ['title', 'text']); }),
            Utils.loadJSON("data/equipments.json")  .then(function(data) { Encyclopedia.equipments = Encyclopedia._loadDeemphasize(Encyclopedia._loadHandleCount(data), ['title']); }),
            Utils.loadJSON("data/expansions.json")  .then(function(data) { Encyclopedia.expansions = data; }),
            Utils.loadJSON("data/maps.json")        .then(function(data) { Encyclopedia.maps = data; }),
            Utils.loadJSON("data/models.json")      .then(function(data) { Encyclopedia.models = Encyclopedia._loadHandleCount(data); }),
            Utils.loadJSON("data/tiles.json")       .then(function(data) { Encyclopedia.tiles = Encyclopedia._loadDeemphasize(Encyclopedia._loadHandleColors(Encyclopedia._loadHandleCount(data)), ['name']); }),
            Utils.loadJSON("data/tokens.json")      .then(function(data) { Encyclopedia.tokens = Encyclopedia._loadDeemphasize(Encyclopedia._loadHandleCount(data), ['name']); }),
            Utils.loadJSON("data/heroes.json")      .then(function(data) { Encyclopedia.heroes = Encyclopedia._loadDeemphasize(data, ['name', 'subname']); }),
            Utils.loadJSON("data/rules.json")       .then(function(data) { Encyclopedia.rules = data; })
        ]);
    },
    
    _i18n: {
        'fr': {
            'copyright': "Données anglaises récupérées sur le site <a target='_blank' href='https://conan-companion.herokuapp.com/'>conan-companion.herokuapp.com</a> avec l'aimable autorisation de David Abel.<br/>Traductions françaises saisies par <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a>.<br/>Traductions italiennes réalisées par <a href=\"https://the-overlord.net/index.php?/profile/6029-pensareadaltro/\">@pensareadaltro</a>.<br/>Données Corinthia transmises par <a href=\"https://the-overlord.com/index.php?/profile/107-corwin/\">@Corwin</a>.<br/>Les photos des figurines et les textes associés ont été repris du site <a href='http://conan.paintings.free.fr/'>Conan paintings</a>."
        },
        'en': {
            'copyright': "English data collected on the site <a target='_blank' href='https://conan-companion.herokuapp.com/'>conan-companion.herokuapp.com</a> with the kind authorization of David Abel.<br/>French translations entered by <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a>.<br/>Italian translations done by <a href=\"https://the-overlord.net/index.php?/profile/6029-pensareadaltro/\">@pensareadaltro</a>.<br/>Corinthia data transmited by <a href=\"https://the-overlord.com/index.php?/profile/107-corwin/\">@Corwin</a>.<br/>Models photos and associated texts where gather on the <a href='http://conan.paintings.free.fr/'>Conan paintings</a> site."
        },
        'it': {
            'copyright': "Le informazioni in inglese provengono dal sito: <a target='_blank' href='https://conan-companion.herokuapp.com/'>conan-companion.herokuapp.com</a> con la cortese autorizzazione di David Abel.<br/>Traduzione in francese di <a href='https://the-overlord.com/index.php?/profile/5240-cochon/' target='_blank'>@cochon</a>.<br/>Traduzione in italiano di <a href=\"https://the-overlord.net/index.php?/profile/6029-pensareadaltro/\">@pensareadaltro</a>.<br/>Le informazioni su Corinthia provengono da <a href=\"https://the-overlord.com/index.php?/profile/107-corwin/\">@Corwin</a>.<br/>Miniature, foto e testi associati provengono dal sito: <a href='http://conan.paintings.free.fr/'>Conan paintings</a>."
        }
    },    
    
    copyright: function() 
    {
        return "<p>" + Encyclopedia._i18n[Language].copyright + "</p>"
    }
});
