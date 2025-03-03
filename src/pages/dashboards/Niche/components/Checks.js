import { Checkbox, FormControlLabel } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomCheckbox = styled(Checkbox)`
  & .MuiSvgIcon-root {
    font-size: 28px;
  }
`;

const CustomInput = styled(FormControlLabel)`
  margin-left: 10px;
  & .MuiFormControlLabel-label {
    font: 600 14px "Inter", sans-serif;
    color: #64748f;
  }
  margin-top: -10px;
`;

const Checks = (props) => {
  const { sendEmailCheck, updateNicheCheck, handleUpdateNicheCheckbox } = props;
  return (
    <Container>
      <CustomInput
        control={<CustomCheckbox checked={sendEmailCheck} disabled={true} />}
        label="Send me an email once the data is ready"
      />
      <CustomInput
        control={
          <CustomCheckbox
            checked={updateNicheCheck}
            onChange={handleUpdateNicheCheckbox}
          />
        }
        label="Update niche that already exist in our database"
      />
    </Container>
  );
};

export default Checks;
