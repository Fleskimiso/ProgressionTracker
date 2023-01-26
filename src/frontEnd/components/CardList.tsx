import React, {useEffect, useState} from "react"


//making my own list

interface Props<T> {
    renderItem: (item: T) => JSX.Element;
    keyExtractor: (item: T) => string;
    data: T[]  
}

export const CardList = <T extends unknown>({ renderItem, keyExtractor, data }: Props<T>) => {

    const [currentIndex,setCurrentIndex ] = useState(0);
    const [elementsPerList,setelementsPerList] = useState(10);

    const [currentList, setcurrentList] = useState<T[]>([]);
    useEffect(() =>{
        const temporaryList: T[] = [];
        for(let i=currentIndex, j=0; i<data.length, j<elementsPerList; i++, j++ ){
            temporaryList.push( data[currentIndex+i] )
        }
        setcurrentList(temporaryList);
    },[ currentIndex,data])

    //implement pagination
    return <div>
        <div>Go back</div>
        <div>
            {currentList.map(item =>{
                if(item) {
                    return <div key={keyExtractor(item)}>
                        {renderItem(item)}
                    </div>;
                }
            })} 
        </div>
        <div>Go forward</div>
        <div>Go to: </div>
    </div>
}