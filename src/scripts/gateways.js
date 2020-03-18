const baseUrl = 'http(s)://5e723c2b942d92001611ac09.mockapi.io/api/v1/events';


const getEventList = () => fetch(baseUrl)
        .then((response) => response.json())
        .then((eventList) => 
            eventList.map(({_id, ...event}) => ({...event, id:_id}))
    );



const addNewEvent = (event) => fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
              },
              body: JSON.stringify(event),
            })
            .then((response) => { 
                if(response.ok){
                   return response.json();  
                } 
                throw new Error('failed to save event')
            });
    
           


const updateEvent = (eventId, updatedData) => fetch( `${baseUrl}/${eventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(updatedData),
    })
    .then((response) => { 
        if(response.ok){
           return response.json();  
        } 
        throw new Error('failed to update event')
        
    })
        .then(({_id, ...event}) => ({...event, id:_id}));




const eventDelete = (idEvent) => fetch ( `${baseUrl}/${eventId}`, {
        method: 'DELETE',
    })
    .catch((err) => console.log(err));




const getOneEvent = (eventId) => fetch( `${baseUrl}/${eventId}`)
.then((response) => { 
    if(response.ok){
       return response.json();  
    } 
    throw new Error('failed to edit event')
    
})
.then(({_id, ...event}) => ({...event, id:_id}));

export { eventDelete, updateEvent, addNewEvent, getEventList, getOneEvent};