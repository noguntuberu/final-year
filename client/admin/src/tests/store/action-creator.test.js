/**
 * 
 */
//
import {createStore} from 'redux';
import ActionCreator from '../../store/action-creators/action-creator';
import adminReducer from '../../store/reducer';

describe("Testing My redux Store", () => {

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

    let store;
    
    beforeAll(() => {
        store = createStore(adminReducer, initialState);
    })

    it("Tests if store is created", () => {
        expect(store.getState()).toEqual(initialState);
    });

    describe("Action Creator tests", () => {
        //
        it ("creates addPost action", () => {
            let data = {
                id: "xyz", title: "title", body: "Hey, boo.",
                dateCreated: "22 May, 2019", image: "Image URI",
                likeCount: 23, dislikeCount: 31, commentCount: 12,
                viewCount: 200
            }

            let addPostAction = ActionCreator.addPost(data);
            expect(addPostAction.type).toEqual('ADD_POST');
        });

        //
        it ("creates addCredential action", () => {
            let data = {
                userId: "0009", name: "Nathan O.", token: "x3454ghd&^dgev"
            }

            let addCredentialAction = ActionCreator.addCredential(data);
            expect(addCredentialAction.type).toEqual('ADD_CREDENTIAL');
        });

        //
        it ("creates addPostAnalysis action", () => {
            let data = {
                id: ";alksydhb",
                postId: "009",
                score: 45
            }

            let addPostAnalysis = ActionCreator.addPostAnalysis(data);
            expect(addPostAnalysis.type).toEqual('ADD_POST_ANALYSIS');
        });

        //
        it ("creates addGroupAnalysis action", () => {
            let data = {
                id: 9, postId: 9, className: "country", groupName: "Nigeria", score: 89 
            }

            let addGroupAnalysisAction = ActionCreator.addGroupAnalysis(data);
            expect(addGroupAnalysisAction.payload.className).toEqual('country');
        });

        //
        it ("creates addComment action", () => {
            let data = {
                id: 98,
                postId: 67,
                userName: "Customer A",
                dateCreated: "",
                score: 66
            }

            let addCommentAction = ActionCreator.addComment(data);
            expect(addCommentAction.type).toEqual('ADD_COMMENT');
        });

        //
        it ("creates addDraft action", () => {
            let data = {
                title: "Post title",
                body: "",
                image: "lol",
                audience: "all"
            }

            let addDraftAction = ActionCreator.addDraft(data);
            expect(addDraftAction.type).toEqual('ADD_DRAFT');
        });

        //
        it("creates updatePostAnalysis action", () => {
            let data = {

            }
            let updatePostAnalysisAction = ActionCreator.updatePostAnalysis(data);
            expect(updatePostAnalysisAction.type).toEqual('UPDATE_POST_ANALYSIS');
        });

        //
        it ("creates updateGroupAnalysis action", () => {
            let data = {

            }

            let updateGroupAnalysisAction = ActionCreator.updateGroupAnalysis(data);
            expect(updateGroupAnalysisAction.type).toEqual('UPDATE_GROUP_ANALYSIS');
        })
    });
});  

