import {FC, useEffect, useState} from "react";
import {getAssets} from "../AssetsService";

export const AssetsList: FC = () => {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    try {
      const assets = await getAssets();
      console.log(assets);
      setList(assets.data);
    } catch (e){
      console.error(e);
    }
  }

  useEffect( () => {
    fetchData();
  }, []);

  console.log(list)
  return (
    <div>Assets List</div>
  )
}
