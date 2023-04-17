function renderScoreResult(note) {
    let treble = ''
    let bass = '';

    if (note.name) {
        if (note.octave >= 4 && note.name !== "LA4" && note.name !== "SI4") {
            treble = note.abcjs
        } else {
            bass = note.abcjs
        }
    }


    var trebleAndBass = `
X:1
M: 4/4
K:treble
V:V1 clef=treble
V:V2 clef=bass
[V:V1] ${treble}
[V:V2] ${bass}
`;

    ABCJS.renderAbc('scoreResult', trebleAndBass, { scale: 3 });
}

function renderScoreToGuess() {
    const note = randomNote();

    let treble = ''
    let bass = '';

    if (note.name) {
        if (note.octave >= 4 && note.name !== "LA4" && note.name !== "SI4") {
            treble = note.abcjs
        } else {
            bass = note.abcjs
        }
    }


    var trebleAndBass = `
X:1
M: 4/4
K:treble
V:V1 clef=treble
V:V2 clef=bass
[V:V1] ${treble}
[V:V2] ${bass}
`;

    ABCJS.renderAbc('scoreToGuess', trebleAndBass, { scale: 3 });

    return note;
}