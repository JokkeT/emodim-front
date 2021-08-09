export const analysisEndpoint = "http://localhost:5000";
export const chatEndpoint = "http://localhost:3010";
export const annotations = !!process.env.REACT_APP_ANNOTATIONS;
export const messageFeedbackStrings = {
    negative: "Tästä viestistä on tunnistettu negatiivisia tunteita.",
    neutral: "Viestin tunnesisältö on neutraali.",
    positive: "Tästä viestistä on tunnistettu positiivisia tunteita."
}
export const feedbackTitles = {
    regular: "Tarkista viestisi kieliasu",
    annotated: "Tarkista viestisi tunnesisältö"
}
