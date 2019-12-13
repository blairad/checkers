
# Table of Contents

1.  [MVP](#org9111b75)
    1.  [Logic](#orgd62cda4)
        1.  [game function](#orga1639bd)
        2.  [y value of players must change on turn](#orgaf021f4)
        3.  [board is array of maps?](#orge51ffe3)
    2.  [Display](#orgec21615)
        1.  [display the board](#org0a973ec)
        2.  [display player pieces](#org1f330cb)
        3.  [display player turn](#org06dc8bb)
2.  [Extension](#org3b290c3)
    1.  [Network play!](#org789c143)
    2.  [Logic](#org5671a37)
    3.  [Display](#org73b6b15)
        1.  [animate turn](#org559eabb)



<a id="org9111b75"></a>

# MVP


<a id="orgd62cda4"></a>

## Logic


<a id="orga1639bd"></a>

### game function

-   logic lives either in a function or an object?


<a id="orgaf021f4"></a>

### y value of players must change on turn

-   depending on player the y value will have to be swapped for logic to work.


<a id="orge51ffe3"></a>

### board is array of maps?

    const pieces = [player: 1]
    
    function player(name, colour, pieces) {
    this.name = name;
    this.colour = colour;
    this.pieces = pieces;
    }
    
    const player1 = player("james", "white", pieces);
    const player2 = player("andrew", "black", pieces);
    
    // 64 positions
    const board = [
    [player: 1],
    [player: 1],
    [player: 1],
    [player: 1],
    [player: 1],
    [player: 1],
    [player: 1],
    [player: 1],
    [player: 1],
    ....
    ]


<a id="orgec21615"></a>

## Display


<a id="org0a973ec"></a>

### display the board

-   use css grid


<a id="org1f330cb"></a>

### display player pieces

-   import png or create circle in css


<a id="org06dc8bb"></a>

### display player turn

-   change banner to show player turn?


<a id="org3b290c3"></a>

# Extension


<a id="org789c143"></a>

## Network play!


<a id="org5671a37"></a>

## Logic


<a id="org73b6b15"></a>

## Display


<a id="org559eabb"></a>

### animate turn

