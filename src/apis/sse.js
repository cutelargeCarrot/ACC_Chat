// server send event
export function SSE(){
    const source = new EventSource('http://localhost:3000/stream')
    source.onopen = (data) =>{
        console.log("Connected",data)
    }
    source.onmessage = (res) =>{
        console.log("onmessage",res.data)
    }
    source.onerror = (e) => {
        console.log("onerror", e, EventSource.CLOSED, EventSource.CONNECTING);
        if (e.target.readyState === EventSource.CLOSED) {
            console.log('Disconnected');
        } else if (e.target.readyState === EventSource.CONNECTING) {
            console.log('Connecting...');
        }
    }
}