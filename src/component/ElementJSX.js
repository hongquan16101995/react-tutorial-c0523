function ElementJSX() {

    function m1() {
        alert("Hello")
    }

    function m2(data) {
        alert(data)
    }
    return (
        <>
           <table border={1} style={{ color: 'red'}}>
               <tbody>
               <tr>
                   <td onClick={m1}>1</td>
                   <td onClick={() => {
                       m2("abc")
                   }}>2</td>
                   <td>3</td>
               </tr>
               <tr>
                   <td>1</td>
                   <td>2</td>
                   <td>3</td>
               </tr>
               </tbody>
           </table>
        </>
    )
}

export default ElementJSX
