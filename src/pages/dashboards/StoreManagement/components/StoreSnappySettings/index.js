import { Box, Checkbox, Button as MuiButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";

import {
  get_store_management_api,
  post_store_management_api,
} from "../../../../../utils/api_call";
import LoaderDiv from "../../../../components/LoaderDiv";

import SKUPicker from "./skuPicker";

const SkuContainer = styled.div`
  padding: 40px;
  width: 700px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 2px;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const TextLabel = styled.div`
  width: 30%;
  font-weight: 500;
  font-size: 16px;
`;
const SaveBtn = styled(MuiButton)`
  cursor: pointer;
  width: 30%;
  font-weight: 500;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 30px;
  padding: 5px 0;
`;

const RespLabel = styled.label`
  color: royalblue;
  margin-left: 10px;
  padding: 10px;
  background-color: aliceblue;
`;

const TextInput = styled.input`
  margin-left: 61px;
  border-radius: 5px;
  border: 1px solid darkgray;
  padding: 8px;
  font-size: 14px;
  width: 200px;
`;

const StoreSnappyPlaning = ({ store }) => {
  const [skuList, setSkuList] = useState([]);
  const [sku, setSku] = useState("all");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isInventoryThreshold, setIsInventoryThreshold] = useState(false);
  const [isUntrackedInventory, setUntrackedInventory] = useState(false);
  const [inventoryThreshold, setInventoryThreshold] = useState(0);

  useEffect(() => {
    if (store !== "all") {
      setLoading(true);
      const api_response = get_store_management_api(
        `/snappy_settings/${store}`
      );
      api_response
        .then((result) => {
          const response = result.data;
          // get sku list
          setSkuList(response.sku_list);
          response?.snappy_settings[sku]?.threshold_value
            ? setInventoryThreshold(
                `${response.snappy_settings[sku].threshold_value}`
              )
            : setInventoryThreshold(0);
          response?.snappy_settings[sku]?.sync_untracked_inventory
            ? setUntrackedInventory(
                response.snappy_settings[sku].sync_untracked_inventory
              )
            : setUntrackedInventory(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [store, sku]);

  const showResponseMessage = (msg) => {
    setResponseMessage(msg);
    setTimeout(() => {
      setResponseMessage("");
    }, 3000);
  };

  const onSaveHandler = () => {
    if (store !== "all" && sku !== "all") {
      const payload = {
        store: store,
        sku: sku,
        threshold_value: isInventoryThreshold ? inventoryThreshold : 0,
        sync_untracked_inventory: isUntrackedInventory,
      };
      const api_response = post_store_management_api(
        "/snappy_settings",
        payload
      );
      api_response
        .then((result) => {
          if (result.status === 200) {
            showResponseMessage(result?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      showResponseMessage("Please select store & sku first!");
    }
  };

  return (
    <React.Fragment>
      <SkuContainer>
        {loading ? (
          <>
            <div>
              <LoaderDiv />
            </div>
          </>
        ) : (
          <>
            <Box>
              <SKUPicker value={sku} onSelect={setSku} skuList={skuList} />
            </Box>
            <CheckBoxContainer>
              <TextLabel>Set Inventory Threshold</TextLabel>
              <Checkbox
                checked={isInventoryThreshold}
                onChange={(e) => setIsInventoryThreshold(e.target.checked)}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 }, marginLeft: 10 }}
              />
              <TextInput
                disabled={!isInventoryThreshold}
                value={inventoryThreshold}
                onChange={(e) => setInventoryThreshold(e.target.value)}
                type={"number"}
                placeholder="inventory threshold"
              />
            </CheckBoxContainer>
            <CheckBoxContainer>
              <TextLabel>Send untracked Inventory To Snappy</TextLabel>
              <Checkbox
                checked={isUntrackedInventory}
                onChange={(e) => setUntrackedInventory(e.target.checked)}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 }, marginLeft: 10 }}
              />
            </CheckBoxContainer>
            <SaveBtn variant="contained" onClick={onSaveHandler}>
              Save
            </SaveBtn>
            {responseMessage ? (
              <>
                <RespLabel>{responseMessage}</RespLabel>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </SkuContainer>
    </React.Fragment>
  );
};

//TODO: Will be used in future
StoreSnappyPlaning();
//export default StoreSnappyPlaning;
