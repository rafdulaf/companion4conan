var Maps = {
    _i18n: {
        'fr': {
            'menu': "Plateaux",
            'back': "Retour au choix des plateaux",
            'openMap': "Cliquez pour voir le plateau : ",
            'los': "Lignes de vue",
            'help': "Règles du plateau",
            'rotate': "Tourner le plateau",
            'forum': "Une question sur le plateau ? Demandez sur le forum !",
            'losfile': "Télécharger l'image des lignes de vue du plateau",
            'pdf': "Télécharger les règles du plateau",
            'start': "Cliquez sur une zone pour voir les lignes de vue",
            'legend': "Légende",
            'clickhelp1': "La zone actuellement selectionnée est en bleu et offre des lignes de vues vers toutes les zones colorées.",
            'clickhelp4': "Les zones colorées en jaune sont en contrebas et donnent le bonus d'élévation d'un dé jaune.",
            'clickhelp6': "Les zones vertes sont au même niveau que la zone bleue.",
            'clickhelp5': "Les zones colorées en turquoise sont au dessus.",
            'clickhelp3': "Le nombre de cercles verts imbriqués au centre d'une zone indique le niveau d'élévation.",
            'copyright': "Les textes d'aide des plateaux sont issus des textes proposés par leurs créateurs respectifs. Certains sont retouchés.<br/>"
                        + "Certains plateaux proposent de télécharger une vue statique des lignes de vue. Ces vues ont été réalisées par <a href='https://the-overlord.com/index.php?/profile/13-roolz/' target='_blank'>@Roolz</a>.<br/>"
                        + "Le principe des lignes de vues dynamiques est une idée de <a href='https://the-overlord.com/index.php?/profile/88-pamplerousse/' target='_blank'>@Pamplerousse</a>.<br/>"
                        + "Le plateau :",
            'copyright_prop': "est la propriété de"
        },
        'en': {
            'menu': "Boards",
            'back': "Back to the boards choice",
            'openMap': "Click to see the board: ",
            'los': "Lines of sight",
            'help': "Board rules",
            'rotate': "Turn the board",
            'forum': "A question on this board? Ask the forum!",
            'losfile': "Download the static lines of sight board",
            'pdf': "Download the board rules",
            'start': "Click in an area to see the lines of sight",
            'legend': "Legend",
            'clickhelp1': "Blue area is the selected area. It has has line of sight to all colored areas.",
            'clickhelp4': "Yellow areas are below the blue area: Ranged attacks to these areas get an Elevation bonus of 1 yellow die.",
            'clickhelp6': "Green areas are at the same level as the blue area.",
            'clickhelp5': "Turquoise areas are above the blue area.",
            'clickhelp3': "The number of nested green circles in the center of an area show its elevation level.",
            'copyright': "The help text of the boards are proposed by their respective creators. Some of them were modified.<br/>"
                        + "Some boards allow to download a static ligne of sight view. This views were realized by <a href='https://the-overlord.com/index.php?/profile/13-roolz/' target='_blank'>@Roolz</a>.<br/>"
                        + "The principle of the dynamic line of sights is based on a idea of <a href='https://the-overlord.com/index.php?/profile/88-pamplerousse/' target='_blank'>@Pamplerousse</a>.<br/>"
                        + "The board:" ,
            'copyright_prop': "is the property of"
        },
	    'it': {
            'menu': "Mappe",
            'back': "Ritorna alla scelta delle mappe",
            'openMap': "Click per vedere la mappa: ",
            'los': "Linee di vista",
            'help': "Regole",
            'rotate': "Ruota la mappa",
            'forum': "Domande su questa mappa? Falle sul forum!",
            'losfile': "Scarica la mappa statica con le linee di vista",
            'pdf': "Scarica le regole delle mappa",
            'start': "Click in un'area per visualizzare le linee di vista",
            'legend': "Legenda",
            'clickhelp1': "Le aree blu sono le aree selezionate. Hanno linea di vista libera verso tutte le aree colorate.",
            'clickhelp4': "Le aree gialle sono un livello superiore alle aree blu: Attacchi a distanza da queste aree guadagnano un bonus Elevazione di +1 Dado giallo.",
            'clickhelp6': "Le aree verdi sono allo stesso livello delle aree blu.",
            'clickhelp5': "Le aree celesti sono un livello inferiore a quelle blu.",
            'clickhelp3': "Il numero di cerchi verdi concentrici al centro dell'area indica il suo livello di elevazione.",
            'copyright': "I testi esplicativi per ogni mappa sono stati redatti dai loro rispettivi creatori. Alcuni di questi sono stati modificati.<br/>"
                        + "In alcune mappe è possibile scaricare uno schema delle linee di vista statiche. Questi schemi sono stati realizzati da: <a href='https://the-overlord.com/index.php?/profile/13-roolz/' target='_blank'>@Roolz</a>.<br/>"
                        + "I principi delle linee di vista dinamiche sono basati su un'idea di: <a href='https://the-overlord.com/index.php?/profile/88-pamplerousse/' target='_blank'>@Pamplerousse</a>.<br/>"
                        + "Le mappe:" ,
            'copyright_prop': "è proprietà di:"
        }
    },

	init: function(config)
	{
        Nav.addIcon(Maps._i18n[Language].menu, "maps-icon", "maps");

        Nav.addAction("maps", Maps._i18n[Language].legend, "maps-icon-legend", "legend", Maps._legend );
        Nav.addAction("maps", Maps._i18n[Language].pdf, "maps-icon-pdf", "pdf", Maps._downloadPdf);
        Nav.addAction("maps", Maps._i18n[Language].losfile, "maps-icon-losfile", "losfile", Maps._losFile);
        Nav.addAction("maps", Maps._i18n[Language].forum, "maps-icon-forum", "forum", Maps._openForum);
        Nav.addAction("maps", Maps._i18n[Language].rotate, "maps-icon-rotate", "rotate", function() { Maps._rotate(-1); } );

        Nav.hideAction("maps", "pdf");
        Nav.hideAction("maps", "forum");
        Nav.hideAction("maps", "losfile");
        Nav.hideAction("maps", "rotate");
        Nav.hideAction("maps", "legend");

        Maps._rotation = window.screen.width / window.screen.height > 1.2 ? 0 : 3;

		var toRemove = [];

		for (var i in Encyclopedia.maps.list)
		{
			var map = Encyclopedia.maps.list[i];

            if (!About._hasExpansion(map.description.origins))
            {
                map.discard = true;
            }

            Maps._check(map);
		}

        $(window).on('resize', Maps._onResize);
        $(window).on('orientationchange', Maps._onResize);
		Maps._displayIndex();

        About.addCopyright(Maps._i18n[Language].menu, Maps._i18n[Language].copyright + Maps._copyright());
	},

	_hideAll: function()
	{
		$("#maps > .map-card").hide();
	},

    _check: function(map)
    {
        for (var z in map.zones)
        {
            var zone = map.zones[z];
            var nbZCenters = zone.centers.length;
            for (var l=0; l < zone.links.length; l++)
            {
                var link = zone.links[l];
                var result = /^([0-9]+)#(.+)#([0-9]+)$/.exec(link)
                if (!result)
                {
                    console.error("    Error in zone '" + z + "', the link n°" + l + " is not readable: " + link);
                }
                else
                {
                    var centerOfZ = parseInt(result[1]);
                    var targetZoneName = result[2];
                    var centerOfTarget = parseInt(result[3]);

                    if (centerOfZ < 1 || centerOfZ > nbZCenters)
                    {
                        console.error("    Error in zone '" + z + "', the link n°" + l + " starts from an unexisting center: " + link);
                    }

                    var targetZone = map.zones[targetZoneName];
                    if (!targetZone)
                    {
                        console.error("    Error in zone '" + z + "', the link n°" + l + " links to an unexisting zone: " + link);
                    }
                    else
                    {
                        var nbTargetZoneCenters = targetZone.centers.length;
                        if (centerOfTarget < 1 || centerOfTarget > nbTargetZoneCenters)
                        {
                            console.error("    Error in zone '" + z + "', the link n°" + l + " leads to an unexisting center: " + link);
                        }
                        else if (!zone.onewaylinks)
                        {
                            var reverseLink = centerOfTarget + "#" + z + "#" + centerOfZ;
                            if (!targetZone.links.includes(reverseLink))
                            {
                                console.error("    Error in zone '" + z + "', the link n°" + l + " has no reverse link: " + link);
                            }
                        }
                    }
                }
            }
        }
    },

	_displayIndex: function()
	{
		Maps._hideAll();
        Nav.hideAction("maps", "pdf");
        Nav.hideAction("maps", "forum");
        Nav.hideAction("maps", "losfile");
        Nav.hideAction("maps", "rotate");
        Nav.hideAction("maps", "legend");

		var id = "maps-index";

		var index = $('#' + id);

        $('#maps').attr('title', Maps._i18n[Language].menu);
        Nav.updateTitle();

		if (index.length == 0)
		{
			var code = "";
			for (var i in Encyclopedia.maps.list)
			{
                var map = Encyclopedia.maps.list[i];
                if (!map.discard)
                {
    				var imgCode = "<div class='map-index-board-image' style=\"background-image: url('" + map.description.thumbnail + "?version=" + Version + "\');\"/>"
                    var subtitleCode = "<div class='map-index-board-sublegend'>" + Maps._getOrigin(map) + "</div>";
    				var titleCode = "<div class='map-index-board-legend'>" + map.description.title[Language] + "</div>";
    				code += "<li><a href=\"javascript:void(0);\" title=\"" + Maps._i18n[Language].openMap + map.description.title[Language] + "\" onclick=\"Maps._displayMap('" + map.id + "')\">" + imgCode + titleCode + subtitleCode + "</a></li>";
                }
			}

			$('#maps').append("<div id='" + id + "' class='map-card map-index' style='display: none'><ul>" + code + "</ul></div>");
			index = $('#' + id);
		}

		index.show();
	},

    _getOrigin: function(map)
    {
        var origin = "";
        for (var j in Encyclopedia.expansions.list)
        {
            var expansion = Encyclopedia.expansions.list[j];
            if (map.description.origins.indexOf(expansion.id) != -1)
            {
                return expansion.short[Language];
            }
        }
        return null;
    },

    _onSetPosition: function(event, slick)
    {
        if ($('#maps-index').is(':visible'))
        {
            return;
        }

        var map = Maps._getMap();

        if (Maps.onresize)
        {
            Maps.onresize = false;
            Maps._rotate();
        }

        if ((slick.currentSlide || 0) == 0)
        {
            Nav.hideAction("maps", "pdf");
            if (map.description.totopic)
            {
                Nav.showAction("maps", "forum");
            }
            if (map.description.losFile)
            {
                Nav.showAction("maps", "losfile");
            }
            Nav.showAction("maps", "rotate");
            Nav.showAction("maps", "legend");
        }
        else
        {
            if (map.description.totopic)
            {
                Nav.showAction("maps", "forum");
            }
            if (map.description.pdf && map.description.pdf[Language])
            {
                Nav.showAction("maps", "pdf");
            }
            Nav.hideAction("maps", "losfile");
            Nav.showAction("maps", "rotate");
            Nav.hideAction("maps", "legend");
        }
        Nav.updateTitle();
    },

    _onResize: function()
    {
        Maps._rotation = window.screen.width / window.screen.height > 1.2 ? 
            (Maps._rotation == 1 || Maps._rotation == 2 ? 2 : 0) 
            : 
            (Maps._rotation == 1 || Maps._rotation == 2 ? 1 : 3);
        Maps.onresize = true;
    },

    _getMap: function()
    {
        for (var i in Encyclopedia.maps.list)
        {
            var map = Encyclopedia.maps.list[i];
            if (map.id == Maps._currentMap)
            {
                return map;
            }
        }

        throw new "Cannot find map " + mapId;
    },

    _displayMap: function(mapId)
    {
        Maps._lastSelectedZone = null;
        Maps._hideAll();
        Maps._currentMap = mapId;

        Maps._onSetPosition(null, 0);

        var map = Maps._getMap();

        $('#maps').attr('title', map.description.title[Language]);
        Nav.updateTitle();

        var id = "maps-map";

        var mapC = $('#' + id);
        if (mapC.length == 0)
        {
            $('#maps').append("<div id='" + id + "' class='map-card map-map'></div>");
        }
        mapC = $('#' + id);
        mapC.html("");
        mapC.show();
        
        var tabs = [{label: Maps._i18n[Language]['los'], id: "map-map-map"}];
        var map = Maps._getMap();
        var rules = map.description.rules;
        if (rules)
        {
            tabs.push({label: Maps._i18n[Language]['help'], id: "map-map-help"});
        }
        
        Nav.createTabs(id, tabs, Maps._onSetPosition, { label: Maps._i18n[Language].back, action: "Maps._displayIndex()", cls: "map-back" });

        $("#map-map-map")
            .addClass("map-map-wrapper map-map-wrapper-display-help")
            .attr("data-help", Maps._i18n[Language]['start'])
            .html("<img class='map-bg' src='" + map.description.board + "?version=" + Version + "'/>" + "<div class='map-map-area'></div>");
            
        $("#map-map-help").append("<div class='map-map-help'></div>");

        Maps._rotate();
    },

    _helpPoints: function()
    {
        var map = Maps._getMap();
    
        
        var rules = map.description.rules;
        if (rules)
        {
            document.documentElement.style.setProperty('--map-ratio', map.description.rules.ratio || map.description.ratio || 1.16);
            
            var id = "maps-map";
            var mapC = $('#' + id + " .map-map-help");
    
            var aide = "";
                aide += "<div class='map-help-thumb'>";
                aide += "<div class=\"rotate-" + (90*Maps._rotation) + "\">";
    
    
            aide += "<div class='img-wrap'>"
            
            aide += Maps._legendImage(map);
            
            aide += "<img src=\"" + Maps._helpImage(map) + "?version=" + Version + "\"/></div>";
            aide += "</div>";


            aide += "</div>";

            aide += Maps._legendText(map);
    
            mapC.html(aide);
        }
    },
    
    _helpImage: function(map) {
        return map.description.board;
    },
    _legendImage: function(map) {
        return ""; // Default for inheritance
    },
    _legendText: function(map) {
        return ""; // Default for inheritance
    },

    _rotate: function(direction)
    {
        direction = isNaN(direction) ? 0 : direction;

        Maps._rotation = (Maps._rotation + direction) % 4;
        Maps._rotation = (Maps._rotation + 4) % 4;

        Maps._helpPoints();
        Maps._mapArea();
        Maps._click();
    },

    _mapArea: function()
    {
        var map = Maps._getMap();

        var mapArea = $(".map-map-area");

        var availWidth = mapArea.parent().width();
        var availHeight = mapArea.parent().height();
        var availRatio = availWidth / availHeight;

        var size = map.size;
        var x = (0 + Maps._rotation) % 2;
        var y = (1 + Maps._rotation) % 2;
        var mapRatio = size[x] / size[y];

        var svgWidth, svgHeight;
        if (availRatio >= mapRatio)
        {
            // Height 100%
            svgWidth = availHeight * mapRatio;
            svgHeight = availHeight;
        }
        else
        {
            // Width 100%
            svgWidth = availWidth;
            svgHeight = availWidth / mapRatio;
        }

        $('#maps .map-map-wrapper img.map-bg').css({'width': Maps._rotation % 2 == 0 ? svgWidth : svgHeight,
                                                                    'height': Maps._rotation % 2 == 1 ? svgWidth :  svgHeight,
                                                                    'transform': 'translate(-50%,-50%) rotate(' + (-90 * Maps._rotation) + 'deg)' });
        var code = "<svg style=\"width: " + svgWidth + "px; height: " + svgHeight + "px\">";

        function _applyRotate(a, n)
        {
            var n1 = n[0], n2 = n[1];
            switch (Maps._rotation)
            {
                case 0: return a ? n1 *svgWidth/100.0             : n2 *svgHeight/100.0;
                case 1: return a ? n2 *svgWidth/100.0             : svgHeight - n1 *svgHeight/100.0;
                case 2: return a ? svgWidth - n1 *svgWidth/100.0  : svgHeight - n2 *svgHeight/100.0;
                case 3: return a ? svgWidth - n2 *svgWidth/100.0  : n1 *svgHeight/100.0;
            }
        }

        var zNames = [];
        for (var z in map.zones)
        {
            zNames.push(z);
        }
        zNames = zNames.sort();

        for (var kz=0; kz < zNames.length; kz++)
        {
            var z = zNames[kz];
            var zone = map.zones[z];

            var line = "";
            for (var i=0; i < zone.area.length; i++)
            {
                line += (i == 0 ? "M" : "L") + _applyRotate(true, zone.area[i]) + "," + _applyRotate(false, zone.area[i]);
            }
            code += "<path " +
                            "d='" + line + "' " +
                            "data-zone='" + z + "' " +
                            "class='map-map-area-zone'" +
                            "onclick='Maps._click(this)'>" +
                    "</path>";

            // Display level around centers
            for (var i=0; i < zone.centers.length; i++)
            {
                code += "<circle class='center1' cx='" + _applyRotate(true, zone.centers[i]) + "' cy='" + _applyRotate(false, zone.centers[i]) + "' r='" + (0.30)*svgWidth/100.0 + "'/>";
                code += "<circle class='center2' cx='" + _applyRotate(true, zone.centers[i]) + "' cy='" + _applyRotate(false, zone.centers[i]) + "' r='" + (0.40)*svgWidth/100.0 + "'/>";
                code += "<circle class='center2' cx='" + _applyRotate(true, zone.centers[i]) + "' cy='" + _applyRotate(false, zone.centers[i]) + "' r='" + (0.45)*svgWidth/100.0 + "'/>";
                for (var lev=0; lev < zone.level; lev++)
                {
                    code += "<circle class='level' cx='" + _applyRotate(true, zone.centers[i]) + "' cy='" + _applyRotate(false, zone.centers[i]) + "' r='" + (0.65 + 0.3*lev)*svgWidth/100.0 + "'/>";
                }
            }

        }
            code += "</svg>";

        mapArea.html(code);
    },

    _click: function(i)
    {
        var map = Maps._getMap();

        var svg = $(".map-map-area svg");
        var svgWidth = svg.width();
        var svgHeight = svg.height();
        function _applyRotate(a, n)
        {
            var n1 = n[0], n2 = n[1];
            switch (Maps._rotation)
            {
                case 0: return a ? n1 *svgWidth/100.0             : n2 *svgHeight/100.0;
                case 1: return a ? n2 *svgWidth/100.0             : svgHeight - n1 *svgHeight/100.0;
                case 2: return a ? svgWidth - n1 *svgWidth/100.0  : svgHeight - n2 *svgHeight/100.0;
                case 3: return a ? svgWidth - n2 *svgWidth/100.0  : n1 *svgHeight/100.0;
            }
        }

        if (i)
        {
            Maps._lastSelectedZone = $(i).attr('data-zone');
        }
        else if (Maps._lastSelectedZone)
        {
            i = $(".map-map-area svg path[data-zone=" + Maps._lastSelectedZone + "]");
        }
        else
        {
            return;
        }

        var mapArea = $(".map-map-area svg path").removeClass("map-map-area-zone-active").removeClass("map-map-area-zone-target").removeClass("map-map-area-zone-target-upper").removeClass("map-map-area-zone-target-lower");
        $(i).addClass("map-map-area-zone-active");

        var mapArea = $(".map-map-area svg line").remove();

        var id = "maps-map";
        var mapC = $('#' + id + ' .map-map-wrapper').removeClass("map-map-wrapper-display-help");

        var zoneId = $(i).attr('data-zone');
        var zone = map.zones[zoneId];

        for (var a=0; a < zone.links.length; a++)
        {
            var link = zone.links[a];
            /^([0-9]+)#(.+)#([0-9]+)$/.exec(link);

            var center1 = parseInt(RegExp.$1) - 1; // 0 based
            var target = RegExp.$2;
            var center2 = parseInt(RegExp.$3) - 1; // 0 based


            var okp = $(".map-map-area svg path[data-zone=" + target + "]");
            okp.addClass("map-map-area-zone-target");

            var lclass="";

            var zoneTarget = map.zones[target];
            if (zone.level > zoneTarget.level)
            {
                okp.addClass("map-map-area-zone-target-upper");
                lclass=" class='map-map-area-line-target-upper'";
            }
            else if (zone.level < zoneTarget.level)
            {
                okp.addClass("map-map-area-zone-target-lower");
                lclass=" class='map-map-area-line-target-lower'";
            }

            $(".map-map-area svg").append("<line" + lclass + " x1='" + _applyRotate(true, zone.centers[center1]) + "' y1='" + _applyRotate(false, zone.centers[center1]) + "' x2='" + _applyRotate(true, zoneTarget.centers[center2]) + "' y2='" + _applyRotate(false, zoneTarget.centers[center2]) + "' />");
        }

        // SVG fix
        $(".map-map-area").html($(".map-map-area").html());
    },

    _copyright: function()
    {
        var c = "<ul>";

        for (var i in Encyclopedia.maps.list)
        {
            var map = Encyclopedia.maps.list[i];

            c += "<li>"
                + "<strong>" + map.description.title[Language] + "</strong>"
                + " " + Maps._i18n[Language].copyright_prop
                + " <em>" + map.description.copyright + "</em>"
                + " (" + Maps._getOrigin(map) + ")"
                + "</li>"
        }

        c += "</ul>";
        return c;
    },

    _openForum: function()
    {
        var map = Maps._getMap();

        window.open(map.description.totopic[Language] + "#elContent");
    },

    _downloadPdf: function()
    {
        var map = Maps._getMap();

        window.open(map.description.pdf[Language] + "?version=" + Version);
    },
    
    _losFile: function()
    {
        var map = Maps._getMap();

        window.open(map.description.losFile + "?version=" + Version);
    },

    _legend: function()
    {
        Nav.dialog(Maps._i18n[Language].legend,

                    "<div class='line1'>" + Maps._i18n[Language]['clickhelp1'] + "</div>"
               +    "<div class='line4'>" + Maps._i18n[Language]['clickhelp4'] + "</div>"
               +    "<div class='line6'>" + Maps._i18n[Language]['clickhelp6'] + "</div>"
               +    "<div class='line5'>" + Maps._i18n[Language]['clickhelp5'] + "</div>"
               +    "<div class='line3'>" + Maps._i18n[Language]['clickhelp3'] + "</div>"
        );
    }
}

Utils._toInitialize.push(Maps.init);
