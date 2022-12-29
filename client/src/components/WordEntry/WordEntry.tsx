import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { wordType } from "../../state/WordsSlice";
import { styled } from "@mui/material/styles";

const StyledAccordion = styled(Accordion)`
  border: 1px dashed black;
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  margin-left: 10px;
`;

interface WordEntryProps {
  word: wordType;
}

export const WordEntry = ({ word }: WordEntryProps) => (
  <StyledAccordion
    disableGutters={true}
    TransitionProps={{ unmountOnExit: true }}
  >
    <AccordionSummary>{word.word}</AccordionSummary>
    <StyledAccordionDetails>{word.description}</StyledAccordionDetails>
  </StyledAccordion>
);
