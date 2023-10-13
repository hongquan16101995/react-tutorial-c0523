import ReactDOM from "react-dom/client";
import React from "react";
import ElementJSX from "./ElementJSX";

function Element() {
    let check = false
    let arrTd = []
    for (let i = 0; i < 3; i++) {
        let td
            = React.createElement("td", null, "HelloWorld" + i)
        arrTd.push(td)
    }
    let arrTr = []
    for (let i = 0; i < 3; i++) {
        let tr
            = React.createElement("tr", null, arrTd)
        arrTr.push(tr)
    }
    let style = {border: '1px solid'}
    let table
        = React.createElement("table", style, arrTr)
    // root.render(table)
    return (
        <>
            {check && table}
        </>
    )
}

export default Element
