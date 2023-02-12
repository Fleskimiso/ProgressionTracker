import React, { useEffect, useState } from "react"
import immutable from "immutable"


//making my own list

interface Props<T> {
    loadData: (limit: number, offset: number) => Promise<void>
    renderItem: (item: T) => JSX.Element;
    keyExtractor: (item: T) => string;
    data: (T | null)[],
    dataLength: number
}

export const CardList = <T extends unknown>({ dataLength, loadData, renderItem, keyExtractor, data }: Props<T>) => {

    //current cursor position
    const [currentIndex, setCurrentIndex] = useState(0);
    //elements to display per page
    const [elementsPerList, setelementsPerList] = useState(10);
    //current list
    const [currentList, setcurrentList] = useState<T[]>([]);
    //what page to go
    const [whatPage, setwhatPage] = useState("1");

    //reload list on data change 
    useEffect(() => {
        const temporaryList: T[] = [];
        for (let i = currentIndex, j = 0; j < data.length && j < elementsPerList; i++, j++) {
            const x = data[i]
            if (x !== null) {
                temporaryList.push(x);
            }
        }
        setcurrentList(temporaryList);
    }, [currentIndex, data]);

    const whatPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setwhatPage(e.target.value);
    }
    function getWhatPageValue() {
        const parsedValue = parseInt(whatPage);
        if (!Number.isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= Math.ceil(dataLength / elementsPerList)) {
            return parsedValue-1;
        } 
        return false;
    }

    const backOnePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (currentIndex > 0) {
            loadData(elementsPerList, currentIndex - elementsPerList).then(() => {
                setCurrentIndex(currentIndex - elementsPerList);
                setwhatPage(String(Number(whatPage)-1));
            });

        }
    }
    const forwardOnePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(currentIndex);
        
        if (currentIndex + elementsPerList < dataLength) {
            loadData(elementsPerList, currentIndex + elementsPerList).then(() => {
                setCurrentIndex(currentIndex + elementsPerList);
                setwhatPage(String(Number(whatPage)+1));
            });
        }
    }
    const goToAnywhere = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const whatPageVal = getWhatPageValue();
        if(whatPageVal !== false) {
            loadData(elementsPerList, whatPageVal * elementsPerList).then(() => {
                setCurrentIndex(whatPageVal * elementsPerList);
            });
        }
       
    }
    //implement pagination
    return <div className="cardListContainer">
        <div className="cardList">
            {currentList.map(item => {
                if (item) {
                    return <div className="card" key={keyExtractor(item)}>
                        <div className="topCardBorder"></div>
                        {renderItem(item)}
                        <div className="bottomCardBorder"></div>
                    </div>;
                }
            })}
        </div>
        <div className="rowContainer">
            <div className="buttonContainer">
                <button onClick={backOnePage}>Go back</button>
            </div>
            <div className="buttonContainer">
                <button onClick={forwardOnePage}>Go forward</button>
            </div>
        </div>
        <div className="inputGroup">
            <label className="xlabel" htmlFor="pageGoTo">Page  (1-{1+Math.floor(dataLength / elementsPerList)}):</label>
            <input onChange={whatPageChange} value={whatPage} id="pageGoTo" type="text"/>
        </div>
        <div className="singlePlanItem">
        <button className="planButton" onClick={goToAnywhere}>Go</button>
        </div>
    </div>
}