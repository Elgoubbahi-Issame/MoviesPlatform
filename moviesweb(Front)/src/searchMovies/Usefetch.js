import { useEffect, useState } from "react";

function Usefetch(url) {
    const [data, setdata] = useState(null);
    const [isPending, setisPending] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setdata(data);
                    setisPending(false)
                })
        }, 1000);

    }, [url])
    return { data, isPending }
}

export default Usefetch
