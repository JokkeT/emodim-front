import threadReducer from "./threadReducer";
import * as actions from "../actions/threadActions";

describe("thread reducer", () => {

    const initialState = {
        thread: {
            threadID: "",
            startMessage: {},
            comments: [],
            metadata: {}
        }
    };

    it("should return the initial state", () => {
        expect(threadReducer(undefined, {})).toEqual(initialState);
    });

    it("should update current thread", () => {

        const action = {
            type: actions.UPDATE_THREAD_DATA,
            payload: {
                threadID: "1",
                comments: [
                    { commentID: "1", words: ["test1"] }, { commentID: "2", words: ["test2"] }
                ],
                metadata: {
                    title: "title",
                    datetime: "2000-01-02 00:00:00"
                }
            }
        }
        const expectedThread = {
            threadID: "1",
            comments: [
                { commentID: "1", words: ["test1"] },
                { commentID: "2", words: ["test2"] }
            ],
            metadata: {
                title: "title",
                datetime: "2000-01-02 00:00:00"
            }
        };

        const expectedState = {
            ...initialState,
            thread: expectedThread
        }
        const returnedState = threadReducer(initialState, action);

        expect(returnedState).toEqual(expectedState);
    });

    it("should restructure responses inside parent comments", () => {

        const action = {
            type: actions.UPDATE_THREAD_DATA,
            payload: {
                threadID: "1",
                comments: [
                    {
                        commentID: "1", words: ["test1"], children: [
                            { commentID: "2", words: ["test2"], parent_comment_id: "1" }
                        ]
                    }
                ],
                metadata: {
                    title: "title",
                    datetime: "2000-01-02 00:00:00"
                }
            }
        }
        const expectedThread = {
            threadID: "1",
            comments: [
                {
                    commentID: "1", words: ["test1"], children: [
                        { commentID: "2", words: ["test2"], parent_comment_id: "1" }
                    ]
                }
            ],
            metadata: {
                title: "title",
                datetime: "2000-01-02 00:00:00"
            }
        };

        const expectedState = {
            ...initialState,
            thread: expectedThread
        };
        const returnedState = threadReducer(initialState, action);
        expect(returnedState).toEqual(expectedState);
    });

    it("should add new message to the end of the message chain", () => {

        const firstComment = {
            commentID: "1",
            words: ["test1"]
        };

        const secondComment = {
            commentID: "2",
            words: ["test2"]
        }

        const firstState = {
            thread: {
                threadID: "1",
                metadata: {
                    title: "title",
                    datetime: "2000-01-02 00:00:00"
                },
                comments: [firstComment]
            }
        }

        const action = {
            type: actions.ADD_MESSAGE_TO_CURRENT_THREAD,
            payload: secondComment
        };

        const expectedThread = {
            threadID: "1",
            comments: [
                firstComment,
                secondComment
            ],
            metadata: {
                title: "title",
                datetime: "2000-01-02 00:00:00"
            }
        };

        const expectedState = {
            ...initialState,
            thread: expectedThread
        };

        const returnedState = threadReducer(firstState, action);
        expect(returnedState).toEqual(expectedState)
    });
});
