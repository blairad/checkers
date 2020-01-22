const lobbyView = {

    renderPlayers(players) {
        const playerList = document.getElementById('players')
        playerList.innerHTML = '';
        console.log(lobby)
        players.forEach(player => {
            const listItem = document.createElement('button');
            listItem.id = player.id;
            listItem.innerHTML = player.name;
            playerList.appendChild(listItem)
            playerList.appendChild(document.createElement('br'));
        })
    }
}


module.exports = lobbyView;