function Fruit(props){
    let cardClasses = 'card';

    if(props.color==='danger'){
        cardClasses += ' bg-danger text-white';
    }
 return(
    <div className={cardClasses}>
    <img src="https://via.placeholder.com/150" className="card-img-top" alt="..."></img>
    <div className="card-body">
        <h2 className="card-title">{props.fruit.name}</h2>
         <p>{props.fruit.color} </p>
    </div>
</div>
 );
}

export default Fruit;