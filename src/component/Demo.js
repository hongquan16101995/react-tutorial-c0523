function Demo() {
    function m1(a) {
        console.log(a)
    }
    return (
        <>
            <input type="text" value={"abc"} onChange={(event) => {
                m1(event.target.value)
            }}/>
        </>
    )
}

export default Demo
