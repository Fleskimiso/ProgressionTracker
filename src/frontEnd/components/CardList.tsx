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
    //elements to diplay pet page
    const [elementsPerList, setelementsPerList] = useState(10);
    //current list
    const [currentList, setcurrentList] = useState<T[]>([]);
    //what page to go
    const [whatPage, setwhatPage] = useState(0);

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
        setwhatPage(Number(e.target.value));
    }

    const backOnePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (currentIndex > 0) {
            loadData(elementsPerList, currentIndex - elementsPerList).then(() => {
                setCurrentIndex(currentIndex - elementsPerList);
            });

        }
    }
    const forwardOnePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (currentIndex < dataLength) {
            loadData(elementsPerList, currentIndex + elementsPerList).then(() => {
                setCurrentIndex(currentIndex + elementsPerList);
            });
        }
    }
    const goToAnywhere = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        loadData(elementsPerList, whatPage * elementsPerList).then(() => {
            setCurrentIndex(whatPage * elementsPerList);
        });

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
        <div className="buttonContainer inputGroup">
            <label className="xlabel" htmlFor="pageGoTo">Page  (0-{Math.floor(dataLength / elementsPerList)}):</label>
            <input onChange={whatPageChange} value={whatPage} id="pageGoTo" type="number" min={0} max={dataLength / elementsPerList} />
            <button onClick={goToAnywhere}>Go</button>
        </div>
    </div>
}