const lobbyView = {

    renderPlayers(players) {
        const playerList = document.getElementById('players')
        playerList.innerHTML = '';
        console.log(lobby)
        console.log(players);
        for (player in players) {
            const listItem = document.createElement('button');
            listItem.id = players[player].id;
            listItem.className = 'join-game';
            listItem.innerHTML = players[player].name;
            playerList.appendChild(listItem)
            playerList.appendChild(document.createElement('br'));
        }
    }
}


module.exports = lobbyView;
