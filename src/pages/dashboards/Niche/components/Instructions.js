import styled from "styled-components";

const Title = styled.span`
  font: 800 20px "Inter", sans-serif;
  color: #64748f;
  padding-left: 20px;
`;

const UnorderedList = styled.ul`
  margin-top: 5px;
`;

const ListItem = styled.li`
  font: 600 14px "Inter", sans-serif;
  color: #64748f;
`;

const links = {
  opportunityExplorer: "https://sellercentral.amazon.com/opportunity-explorer",
  metabaseDashboard: "https://atomic-growth.metabaseapp.com",
};

const Instructions = () => (
  <>
    <Title>Choose niche to scrape</Title>
    <UnorderedList>
      <ListItem>
        Enter the Niche(s) you would like to analyze. You can request up to 5 at
        a time.
      </ListItem>
      <ListItem>
        Make sure to write the niche name EXACTLY as it appears in the
        Opportunity Explorer{" "}
        <a href={links.opportunityExplorer} target="_blank" rel="noreferrer">
          {links.opportunityExplorer}
        </a>
      </ListItem>
      <ListItem>
        Once the data is ready you'll be able to analyze it in your MetaBase
        dashboard{" "}
        <a href={links.metabaseDashboard} target="_blank" rel="noreferrer">
          {links.metabaseDashboard}
        </a>
      </ListItem>
    </UnorderedList>
  </>
);

export default Instructions;
