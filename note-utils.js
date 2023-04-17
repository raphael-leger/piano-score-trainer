/*
 *	Copyright (c) 2020 Alexander Pankratov, <ap@swapped.ch>
 *	https://swapped.ch/note-detector
 */

/*
 *	Distributed under the terms of the 2-clause BSD license. 
 *	https://www.opensource.org/licenses/bsd-license.php
 */

function hzToNote(freq) {
	var note = 12 * (Math.log(freq / 440) / Math.log(2));
	return Math.round(note) + 49;
}

const notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
const notesEuropean = ["LA", "LA#", "SI", "DO", "DO#", "RE", "RE#", "MI", "FA", "FA#", "SOL", "SOL#"];

function randomNote() {
	const randomLetterIndex = Math.floor(Math.random() * notes.length);
	const letter = notes[randomLetterIndex];
	const letterEuropean = notesEuropean[randomLetterIndex];
	const octave = Math.floor(Math.random() * (6 - 4) + 4);
	const name = letterEuropean + octave;
	const sharp = letter.length > 1 ? true : false;
	const abcjs = toAbcJs(letter, octave, sharp);

	return {
		name,
		letter,
		letterEuropean,
		octave,
		sharp,
		abcjs
	}
}

function toAbcJs(letter, octave, sharp) {
	let abcjs = '';
	let abcjsLetter = letter;
	let abcjsOctave = octave;
	if (letter === "A" || letter === "B" || letter === "A#" || letter === "B#") {
		abcjsOctave = abcjsOctave - 1;
	}

	if (abcjsOctave === 2) {
		abcjsLetter = `${letter},,`
	} else if (abcjsOctave === 3) {
		abcjsLetter = `${letter},`
	} else if (abcjsOctave === 4) {
		abcjsLetter = letter
	} else if (abcjsOctave === 5) {
		abcjsLetter = `${letter.toLowerCase()}`
	} else if (abcjsOctave === 6) {
		abcjsLetter = `${letter.toLowerCase()}'`
	} else if (abcjsOctave === 7) {
		abcjsLetter = `${letter.toLowerCase()}''`
	}

	if (sharp) {
		abcjsLetter = `^${abcjsLetter.charAt(0)}`;
	}
	abcjs = `${abcjsLetter}2`;

	return abcjs;
}

function noteString(note) {
	const letter = notes[(note + 11) % notes.length];
	const letterEuropean = notesEuropean[(note + 11) % notesEuropean.length];
	const octave = Math.floor((note - 49) / notes.length) + 4;

	const name = letterEuropean + octave;
	const sharp = letter.length > 1 ? true : false;
	const abcjs = toAbcJs(letter, octave, sharp);

	return {
		name,
		letter,
		letterEuropean,
		octave,
		sharp,
		abcjs
	};
}

function hzToNoteObject(freq) {
	return noteString(hzToNote(freq));
}

function hzToNoteString(freq) {
	return hzToNoteObject(freq).name;
}

function noteToHz(note) {
	return 440 * Math.pow(2, (note - 49) / 12);
}
