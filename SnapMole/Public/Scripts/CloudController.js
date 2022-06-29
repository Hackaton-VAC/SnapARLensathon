// @input Component.ScriptComponent multiplayerSession
// @input Component.ScriptComponent cloudStorage

var hasConnected = false;

script.multiplayerSession.onStarterConnectedToMultiplayer = function (_session) {
    session = _session;
    script.cloudStorage.createCloudStore(session, onCloudStoreReady);
}

// Once we connect to session, we need to initialize exercise counts for the cloud
function onCloudStoreReady(store) {
    // We will initialize value for the store
    script.cloudStorage.initializeValueInScope(StorageScope.Session, "ownScore", 100, function() {
        print("Initialized Value!")
        hasConnected = true;
    });
}

/*script.createEvent("TapEvent").bind(function() {
    if (!hasConnected) return;
    script.cloudStorage.modifyValueInScope(StorageScope.Session, "myKey", 777);
})*/

script.multiplayerSession.onStarterConnectedToSolo = function (session) {
    // Request to invite others either via friends list or Snapcode
    script.multiplayerSession.shareSession(); 
}

script.multiplayerSession.onStarterConnectedToMultiplayer = function (_session) {
    session = _session;
    script.cloudStorage.createCloudStore(session, onCloudStoreReady);
}

script.multiplayerSession.onReceiverConnectedToMultiplayer = function (_session) {
    session = _session;
}