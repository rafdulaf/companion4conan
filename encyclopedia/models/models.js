var EncyclopediaModels = {
    _i18n: {
        'fr': {
            'tab': "Figu<wbr/>rines",
            'from': "Disponible dans :",
            'fromAnd': "<br/>et",
            'model': "figurine",
            'models': "figurines",
            'paintedBy': "Peint par: ",
            'zoom': "Zoom",
            'print': "Imprimer",
            'heroes': "Utilisée par les héros :",
            'type': "Type"
        },
        'en': {
            'tab': "Minia<wbr/>tures",
            'from': "Available in:",
            'fromAnd': "<br/>and",
            'model': "miniature",
            'models': "miniatures",
            'paintedBy': "Painted par: ",
            'zoom': "Zoom",
            'print': "Print",
            'heroes': "Used by the heroes:",
            'type': "Type"
        },
        'it': {
            'tab': "Minia<wbr/>ture",
            'from': "Disponibile in:",
            'fromAnd': "<br/>e",
            'model': "miniatura",
            'models': "miniature",
            'paintedBy': "Dipinta da: ",
            'zoom': "Zoom",
            'print': "Stampa",
            'heroes': "Usata dagli Eroi:"
        }
    },

    preinit: function()
    {
        Encyclopedia._slides.push({   label: EncyclopediaModels._i18n[Language].tab, id: "encyclopedia-models", onShow: EncyclopediaModels.onShow,  onHide: EncyclopediaModels.onHide });


        EncyclopediaModels._facets = [
            {
                id: 'keyword',
                label: {
                    'fr': "Mot-clé",
                    'en': "Keyword",
                    'it': "Parola chiave"
                },
                filter: function(item, value)
                {
                    return ConanRules._deemphasize(EncyclopediaModels._findModelNames(item)).indexOf(ConanRules._deemphasize(value)) != -1;
                }
            },

            {
                id: 'expansions',
                label: {
                    'fr': "Status",
                    'en': "Status",
                    'it': "Stato"
                },
                values: [
                    {
                        id: "yes",
                        label: {
                            'fr': "Possédées",
                            'en': "Owned",
                            'it': "Nella collezione"
                        }
                    },
                    {
                        id: "no",
                        label: {
                            'fr': "Manquantes",
                            'en': "Missing",
                            'it': "Mancante"
                        }
                    }
                ],
                filter: function(item, selectedValues) {
                    if (selectedValues.length != 1)
                    {
                        return true;
                    }
                    else
                    {
                        var hasExpansion = ConanAbout._hasExpansion(item.origins);
                        return hasExpansion && selectedValues[0] == 'yes'
                                || !hasExpansion && selectedValues[0] == 'no'
                    }
                }
            },

            {
                id: 'origins',
                label: {
                    'fr': "Origine",
                    'en': "Origin",
                    'it': "Origine"
                },
                sort: true,
                values: (function() {
                    var values = [];
                    for (var i in Encyclopedia.expansions.types)
                    {
                        var type = Encyclopedia.expansions.types[i];

                        for (var j in Encyclopedia.expansions.list)
                        {
                            var expansion = Encyclopedia.expansions.list[j];
                            if (expansion.type == type.id)
                            {
                                values.push({
                                    id: expansion.id,
                                    label: expansion.short
                                });
                            }
                        }
                    }
                    return values;
                })(),
                filter: function(item, selectedValues) {
                    var origins = item.origins.slice(0);
                    for (var i in Encyclopedia.expansions.types)
                    {
                        var startRemove = false;

                        var type = Encyclopedia.expansions.types[i];

                        for (var j in Encyclopedia.expansions.list)
                        {
                            var expansion = Encyclopedia.expansions.list[j];
                            if (expansion.type == type.id)
                            {
                                if (startRemove)
                                {
                                    origins = origins.filter(o => o != expansion.id);
                                }
                                else if (origins.indexOf(expansion.id) != -1)
                                {
                                    startRemove = true;
                                }
                            }
                        }
                    }
                    return origins.filter(v => selectedValues.indexOf(v) != -1).length > 0;
                }
            },
            
            {
                id: 'usage',
                label: {
                    'fr': "Utilisé par",
                    'en': "Used by",
                    'it': "Usato da"
                },
                values: [
                    {
                        id: "hero",
                        label: {
                            'fr': "Héros",
                            'en': "Hero",
                            'it': "Eroe"
                        }
                    },
                    {
                        id: "overlord",
                        label: {
                            'fr': "Overlord",
                            'en': "Overlord",
                            'it': "Overlord"
                        }
                    },
                    {
                        id: "none",
                        label: {
                            'fr': "Aucun",
                            'en': "Non",
                            'it': "Nessuno"
                        }
                    }
                ],
                filter: function(item, selectedValues) {
                    for (var i = 0; i < selectedValues.length; i++)
                    {
                        switch (selectedValues[i])
                        {
                            case 'hero':
                                if (EncyclopediaModels._findHeroesByModel(item).length > 0)
                                {
                                    return true;
                                }
                                break;
                            case 'overlord':
                                if (EncyclopediaModels._findTilesByModel(item).length > 0)
                                {
                                    return true;
                                }
                                break;
                            case 'none':
                                if (EncyclopediaModels._findHeroesByModel(item).length == 0
                                    && EncyclopediaModels._findTilesByModel(item).length == 0)
                                {
                                    return true;
                                }
                        }
                    }
                    return false;
                }
            },
            
            {
                id: 'type',
                label: {
                    'fr': "Type",
                    'en': "Type",
                    'it': "Tipo"
                },
                values: [
                    {
                        id: "human",
                        label: {
                            'fr': "Humain",
                            'en': "Human",
                            'it': "Umano"
                        }
                    },
                    {
                        id: "animal",
                        label: {
                            'fr': "Animal",
                            'en': "Animal",
                            'it': "Animale"
                        }
                    },
                    {
                        id: "monster",
                        label: {
                            'fr': "Monstre",
                            'en': "Monster",
                            'it': "Mostro"
                        }
                    }
                ],
                filter: function(item, selectedValues) {
                    for (var i = 0; i < selectedValues.length; i++)
                    {
                        if (selectedValues[i] == item.type)
                        {
                            return true;
                        }
                    }
                    return false;
                }
            }
        ]
    },

    init: function()
    {
        $("#encyclopedia-models").append(Encyclopedia.displaySearchEngine(EncyclopediaModels._facets, "EncyclopediaModels.updateDisplayModels()", "ems"));
        $("#encyclopedia-models").append("<div id='encyclopedia-models-wrapper'></div>");
        EncyclopediaModels.displayModels();
    },

    displayModels: function()
    {
        var models = "";

        Encyclopedia.models.list.sort(function(s1, s2) { return EncyclopediaModels._findModelNames(s1).toLowerCase().localeCompare(EncyclopediaModels._findModelNames(s2).toLowerCase()); })

        var modelList = Encyclopedia.models.list;
        var ignoredPrevious = 0;
        for (var i in modelList)
        {
            i = parseInt(i);
            var model = modelList[i];

            if (i < modelList.length - 1
                && modelList[i+1].id == model.id)
            {
                ignoredPrevious++;
                continue;
            }

            model = modelList[i - ignoredPrevious];

            models += "<a id='model-" + model.id + "' href='javascript:void(0)' data-count='" + (ignoredPrevious+1) + "' onclick='EncyclopediaModels.openModel(\"" + model.id + "\")'>";
            models += "<div>";
            models += "<img src='" + model.thumb + "?version=" + Version + "'/>";
            models += "<span>" + EncyclopediaModels._findModelNames(model) + "</span>"
            models += "</div>";
            models += "</a>";

            ignoredPrevious = 0;
        }

        $("#encyclopedia-models-wrapper").html(models);
        EncyclopediaModels.updateDisplayModels();
    },

    updateDisplayModels: function()
    {
        Encyclopedia.updateFacets(EncyclopediaModels._facets, Encyclopedia.models.list, "ems");

        $("#encyclopedia-models-wrapper a").hide();

        var modelList = Encyclopedia.models.list.filter(Encyclopedia.filter(EncyclopediaModels._facets, "ems"));
        var ignoredPrevious = 0;
        for (var i in modelList)
        {
            i = parseInt(i);
            var model = modelList[i];

            if (i < modelList.length - 1
                && modelList[i+1].id == model.id)
            {
                ignoredPrevious++;
                continue;
            }

            model = modelList[i - ignoredPrevious];

            $("#model-" + model.id).attr('data-count', ignoredPrevious+1).show();

            ignoredPrevious = 0;
        }
    },

    _findTilesByModel: function(model)
    {
        // TODO
        return [];
    },
    
    _findHeroesByModel: function(model)
    {
        var heroes = [];

        if (model)
        {
            for (var i in Encyclopedia.heroes.list)
            {
                var hero = Encyclopedia.heroes.list[i];
                if (hero.model == model.id)
                {
                    heroes.push(hero);
                }
            }
        }
        
        return heroes;
    },
    
    _findModelNames: function(model)
    {
        var names = [];

        if (model)
        {
            var heroes = EncyclopediaModels._findHeroesByModel(model);
            for (var i in heroes)
            {
                var hero = heroes[i];
                var name = hero.name[Language] + (hero.subname ? " <span>" + hero.subname[Language] + "</span>" : "");
                if (names.indexOf(name) == -1)
                {
                    names.push(name);
                }
            }

            var tiles = EncyclopediaModels._findTilesByModel(model);
            for (var i in tiles)
            {
                var tile = tiles[i];
                var name = tile.name[Language];
                if (names.indexOf(name) == -1)
                {
                    names.push(name);
                }
            }
        }
        
        return names.join(" / ") || ("'" + model.id + "'");
    },

    _findModelsById: function(id)
    {
        var models = [];

        for (var i in Encyclopedia.models.list)
        {
            var model = Encyclopedia.models.list[i];
            if (model.id == id)
            {
                models.push(model);
            }
        }

        return models;
    },


    onShow: function() {
    },

    onHide: function() {
    },

    openModel: function(id) {
        var models = EncyclopediaModels._findModelsById(id);

        var originsCount = {};
        for (var e in models)
        {
            var model = models[e];

            var origins = Encyclopedia._removeExtraExpansion(model.origins.slice());
            for (var i in origins)
            {
                var origin = origins[i];
                originsCount[origin] = originsCount[origin] ? originsCount[origin]+1 : 1;
            }
        }

        var originString = "";
        for (var i in originsCount)
        {
            if (originString) originString += " " + EncyclopediaModels._i18n[Language].fromAnd + " ";
            originString += Encyclopedia._getOrigin(i) + " (" + originsCount[i] + " " + (originsCount[i] == 1 ? EncyclopediaModels._i18n[Language].model : EncyclopediaModels._i18n[Language].models) + ")";
        }
        
        
        var modelImages = [];
        var painters = [];
        for (var i in models)
        {
            var model = models[i];
            
            for (var j in model.images)
            {
                var image = model.images[j];
                if (modelImages.indexOf(image) == -1) modelImages.push(image);
            }
            
            if (model.paint
                && painters.map(function (p) {return p.name;}).indexOf(model.paint.name) == -1)
            {
                painters.push(model.paint);
            }
        }
        
        var photos = "<div class='photos'>";
        for (var i in modelImages)
        {
            photos += "<img src='" + modelImages[i] + "?version=" + Version + "'/>"
        }
        photos += "</div>";

        var painter = "";
        if (painters.length)
        {
            painter = "<div class='painter'>" + EncyclopediaModels._i18n[Language].paintedBy; 
            for (var i in painters)
            {
                if (i != 0) painter += ",";
                painter += " <a target='_blank' href='" + painters[i].link + "'>" + painters[i].name + "</a>";
            }
            painter += "</div>";
        }
        
        var model = models[0];
        
        var heroes = "";
        for (var i in Encyclopedia.heroes.list)
        {
            var hero = Encyclopedia.heroes.list[i];
            if (hero.model == model.id)
            {
                if (heroes) heroes += ", ";
                heroes += EncyclopediaHeroes._linkToHero(hero.id);
            }
        }
        if (heroes) heroes = "<div class='heroes'>" + EncyclopediaModels._i18n[Language].heroes + " " + heroes + "</div>";

        Nav.dialog(EncyclopediaModels._findModelNames(model) || "",
            "<div class='modeldetails'>"
                + "<div class='from'>" + EncyclopediaModels._i18n[Language].from + " "
                    + originString
                + "</div>"
                + heroes
                + painter
                + photos
            + "</div>",
            null,
            [{
                label: EncyclopediaModels._i18n[Language].zoom,
                icon: "encyclopedia-models-zoom",
                fn: "EncyclopediaModels._zoom();"
            }, {
                label: EncyclopediaModels._i18n[Language].print,
                icon: "encyclopedia-models-print",
                fn: "window.print()"
            }]
        );
    },

    _zoom: function()
    {
        $(".modeldetails .photos").toggleClass("zoom");
    },

    _linkToModel: function(id, image) {
        var model = EncyclopediaModels._findModelsById(id)[0];
        var name = EncyclopediaModels._findModelNames(model);

        var s = "";
        if (model)
        {
            s += "<a href='javascript:void(0)' onclick='EncyclopediaModels.openModel(\"" + id + "\")'>";
            if (image)
            {
                s += "<img src='" + model.thumb + "?version=" + Version + "'/>";
                s += "<span>" + name + "</span>"
            }
            else
            {
                s += name;
            }
            s += "</a>";
        }
        return s;
    }
};
