// var _fittyElements = null;

// function initOverlayManager() {
//     _fittyElements = fittyElements;
//     populateOverlay();
//     // initWebSocket();
// }

// function populateOverlay() {
//     try {
//         if (contentUpdateMode === null || isNaN(contentUpdateMode) || contentUpdateMode < 1 || contentUpdateMode > 6) {
//             contentUpdateMode = 1;
//         }

//         if (contentUpdateMode !== 5 || contentUpdateMode !== 6) {
//             updateContentInStyleTagFromAJAX(0);
//             return;
//         }
//         updateContentReferenceTimestamp(0);
//     } catch (ex) {
//         console.log(ex);
//     }
// }

// function addChangingFromAJAX() {
//     var ajaxCall = $.ajax({
//         url: `${ serverBaseUrl }/getContentJson`,
//         type: "GET",
//         data: null,
//         dataType: "text",
//         async: false,
//         success: function (data) {
//             var jsonData = JSON.parse(data);
//             addChanging(jsonData);
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             console.log(jqXHR);
//             console.log(textStatus);
//             console.log(errorThrown);
//         }
//     });

//     return JSON.parse(ajaxCall.responseText);
// }

// function addChanging(json) {
//     for (var i = 0; i < json.length; i++) {
//         if (!json[i].changed) {
//             continue;
//         }
//         $(json[i].selector).addClass("changing");
//     }
// }

// function updateContentReferenceTimestamp(timeout) {
//     setTimeout(function () {
//         $("link#contentFile").attr("href", `..importantFiles/shared/content.css?timestamp=${ new Date().getTime() }`);;
//         resizeFittyElements();
//     }, timeout);
// }

// function updateContentInStyleTagFromAJAX(timeout) {
//     setTimeout(function () {
//         $.ajax({
//             url: `${ serverBaseUrl }/getContentCss`,
//             type: "GET",
//             data: null,
//             dataType: "text",
//             async: false,
//             success: function (data) {
//                 $("style#contentCSS").text(data);
//                 resizeFittyElements();
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//                 console.log(jqXHR);
//                 console.log(textStatus);
//                 console.log(errorThrown);
//             }
//         });
//     }, timeout);
// }

// function updateContentInStyleTag(css, timeout) {
//     setTimeout(function () {
//         $("style#contentCSS").text(css);
//         resizeFittyElements();
//     }, timeout);
// }

// function resizeFittyElements() {
//     for (var i = 0; i < _fittyElements.length; i++) {
//         fitty(_fittyElements[i].selector, { minSize: _fittyElements[i].minSize, maxSize: _fittyElements[i].maxSize, multiLine: _fittyElements[i].multiLine });
//     }
// }

// function removeChangingAddChanged(json, timeout) {
//     setTimeout(function () {
//         for (var i = 0; i < json.length; i++) {
//             if (!json[i].changed) {
//                 continue;
//             }
//             $(json[i].selector).removeClass("changing").addClass("changed");
//         }
//     }, timeout);
// }

// function removeChanged(json, timeout) {
//     setTimeout(function () {
//         for (var i = 0; i < json.length; i++) {
//             if (!json[i].changed) {
//                 continue;
//             }
//             $(json[i].selector).removeClass("changed");
//         }
//     }, timeout);
// }

// function updateOverlay(data) {
//     if (data.messageType === "UpdateOverlay") {
//         switch (contentUpdateMode) {
//         case 1:
//             // Fade out elements through JSON WebSocket | Update Content CSS through CSS WebSocket | Fade in elements through JSON WebSocket
//             addChanging(data.json);
//             updateContentInStyleTag(data.css, fadeOutTime);
//             removeChangingAddChanged(data.json, fadeOutTime + invisibleTime);
//             removeChanged(data.json, fadeOutTime + invisibleTime + fadeInTime);
//             break;
//         case 2:
//             // Fade out elements through JSON WebSocket | Update Content CSS through CSS AJAX | Fade in elements through JSON WebSocket
//             addChanging(data.json);
//             updateContentInStyleTagFromAJAX(fadeOutTime);
//             removeChangingAddChanged(data.json, fadeOutTime + invisibleTime);
//             removeChanged(data.json, fadeOutTime + invisibleTime + fadeInTime);
//             break;
//         case 3:
//             // Fade out elements through JSON AJAX | Update Content CSS through CSS AJAX | Fade in elements through JSON AJAX
//             var jsonData = addChangingFromAJAX();
//             updateContentInStyleTagFromAJAX(fadeOutTime);
//             removeChangingAddChanged(jsonData, fadeOutTime + invisibleTime);
//             removeChanged(jsonData, fadeOutTime + invisibleTime + fadeInTime);
//             break;
//         case 4:
//             // No fade out | Update Content CSS through CSS WebSocket | No fade in
//             updateContentInStyleTag(data.css, 0);
//             break;
//         case 5:
//             // Fade out elements through JSON WebSocket | Update timestamp on content.css | Fade in elements through JSON WebSocket
//             addChanging(data.json);
//             updateContentReferenceTimestamp(fadeOutTime);
//             removeChangingAddChanged(data.json, fadeOutTime + invisibleTime);
//             removeChanged(data.json, fadeOutTime + invisibleTime + fadeInTime);
//             break;
//         case 6:
//             // Fade out elements through JSON AJAX | Update timestamp on content.css | Fade in elements through JSON AJAX
//             var jsonData = addChangingFromAJAX();
//             updateContentReferenceTimestamp(fadeOutTime);
//             removeChangingAddChanged(jsonData, fadeOutTime + invisibleTime);
//             removeChanged(jsonData, fadeOutTime + invisibleTime + fadeInTime);
//             break;
//         default:
//             console.log(`Unknown contentUpdateMode: ${ contentUpdateMode }`);
//             break;
//         }
//     }
// }