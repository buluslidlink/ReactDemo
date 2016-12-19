/**
 * Created by weztt on 2016/12/17.
 */
import AppDispacther from  '../dispatcher/firstDispacther';
import  {ReduceStore} from 'flux/utils';

class FirstStore extends ReduceStore {
    getInitialState() {
        return {
            text: 'child2',
            data: 'init',
            err: null
        }
    }

    reduce(state, action) {
        switch (action.actionType) {
            case  'getData': {
                return {
                    text: state.text,
                    data: action.data
                }
            }
            case 'getData_Error': {
                return {
                    ...state,
                    err: action.err
                }
            }
        }
    }
}

export  default  new FirstStore(AppDispacther);