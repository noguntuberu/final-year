/**
 * 
 */
//
import {createStore} from 'redux';
import ActionCreator from '../../store/action-creators/action-creator';
import adminReducer from '../../store/reducer';

describe("Reducer Tests", () => {
    let store;
    beforeAll(() => {
        let initialState = {
            credential: {

            },
            posts: [

            ],
            comments: [

            ],
            postDraft: {

            },
            postAnalysis: [

            ],
            groupAnalysis: [
                
            ]
        }
        store = createStore(adminReducer, initialState);
    });

    describe("Credential Reducer", () => {
        it ("adds a new credential to store", () => {
            let credential = {
                userId: "01",
                name: "Nathan",
                token: ";lkjhedfcvkhsdvlkcgedcvsc"
            }

            let action = ActionCreator.addCredential(credential);
            store.dispatch(action);
            expect(store.getState().credential).toEqual(credential);
        });
    })

    describe ("Post Reducer", () => {
        it ("adds a new Post", () => {
            let post = {
                id: "xyz", title: "title", body: "Hey, boo.",
                dateCreated: "22 May, 2019", image: "Image URI",
                likeCount: 23, dislikeCount: 31, commentCount: 12,
                viewCount: 200
            }

            let action = ActionCreator.addPost(post);
            store.dispatch(action);
            expect(store.getState().posts[0]).toEqual(post);
        });
    });

    describe ("Analysis Reducer", () => {
        it ("adds new post analysis", () => {
            let data = {
                id: 1,
                postId: 9,
                score: 45
            }

            let addPostAnalysis = ActionCreator.addPostAnalysis(data);
            store.dispatch(addPostAnalysis);
            expect(store.getState().postAnalysis[0]).toEqual(data);
        });

        it ("adds new group analysis", () => {
            let data = {
                id: 9, postId: 9, className: "country", groupName: "Nigeria", score: 89 
            }

            let addGroupAnalysisAction = ActionCreator.addGroupAnalysis(data);
            store.dispatch(addGroupAnalysisAction);
            expect(store.getState().groupAnalysis[0]).toEqual(data);
        });

        it ("updates a post analysis item", () => {
            let data = {
                id: 1,
                postId: 9,
                score: 90
            }
            let updatePostAnalysisAction = ActionCreator.updatePostAnalysis(data);
            store.dispatch(updatePostAnalysisAction);
            expect(store.getState().postAnalysis[0]).toEqual(data);
        });

        it ("updates a group analysis item", () => {
            let data = {
                id: 9, postId: 9, className: "country", groupName: "Nigeria", score: 65
            }

            let updateGroupAnalysisAction = ActionCreator.updateGroupAnalysis(data);
            store.dispatch(updateGroupAnalysisAction);
            expect(store.getState().groupAnalysis[0]).toEqual(data);
        });
    });

    describe("Comment Reducer", () => {
        it ("adds a new comment", () => {
            let data = {
                id: 98,
                postId: 67,
                userName: "Customer A",
                dateCreated: "",
                score: 66
            }

            let addCommentAction = ActionCreator.addComment(data);
            store.dispatch(addCommentAction);
            expect(store.getState().comments[0]).toEqual(data);
        });
    });

    describe("Draft Reducer", () => {
        it ("adds a new draft", () => {
            let data = {
                title: "Post title",
                body: "",
                image: "lol",
                audience: "all"
            }

            let addDraftAction = ActionCreator.addDraft(data);
            store.dispatch(addDraftAction);
            expect(store.getState().postDraft).toEqual(data);
        });
    });
})