import { cleanup } from "@testing-library/react";
import React, { useState, useEffect } from "react";


const Effect = () => {

    console.log('state did render');

    const [newType, setNewType] = useState('posts')
    const [jsonArr, setJsonArr] = useState([])
        // sideEffekt wenn ein typ sich ändert

    // useEffekt ist eine Methode der wir eine function übergeben können
    useEffect(() => {
            let loaded = true
                // um ein overlaod zu verhindern kann der fetch gestoppt werden.
                // bei der "light version" geklarieren wir eine variable und setzten diese auf true 
            console.log('newType wurde neu gerendert')

            fetch(`https://jsonplaceholder.typicode.com/${newType}`)
                .then(response => response.json())
                .then(json => {
                    if (loaded) { // im fetch können wir mit einer if var = true abfrage bestimmen wann der fetch gespeichert werden soll
                        console.log(json)
                        setJsonArr(json)
                    }
                })


            return () => { // um den fetch zu stopen (clean up) stoppen wir die funktion 
                //Smit einem return und geben dem return eine fucktion mit welche ganz am ende ausgeführt wird.
                // dabei setzen wir die variale auf false, damit ist die if condition false 
                //und der fetch wird nicht in ein neues state gespeichert.
                loaded = false
                console.log('process stopped');
            }

        }, [newType]) // dependencies werden als Array Übergeben
        // json datei kann in einem state gepeichert werden um dann darauf ein map() anzuwenden

    // wenn sich dieser typ ändert wird die funktion ernuet augeführt.
    // wenn das Array leer bleibt wird die funktion  nur am anfang ausgeführt wenn die seite lädt. 
    //Die funktion wird sich nicht ändern da sich das array nicht zwischen den unterschiedlichen rendern ändert
    // wenn ein leeres array eingesetzt wird, schafft man ein infinity fetch




    return (
		<>
        <div class="buttons">
        <button onClick = {
            () => setNewType('posts')
        } > Posts </button>

        <button onClick = {
            () => setNewType('users')
        } > Users </button>

        <button onClick = {
            () => setNewType('albums')
        } > Albums </button>

        <button onClick = {
            () => setNewType('')
        } > stop fetch </button>

<h3> { newType } </h3>

		</div > {
            jsonArr.map((items, i) => { // im map kann man eine variable 
                //mitgeben welcher als key für die einzelnen items verwendet werden kann.
                //die variable kann man im tag als key definieren und die variable angeben
                return 
				<p key = { i } > { JSON.stringify(items) } </p>
            })
        } 
		</>
    )
}

export default Effect