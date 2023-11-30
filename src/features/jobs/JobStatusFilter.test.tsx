import { render } from "@testing-library/react";
import { JobStatusFilter } from "./JobStatusFilter";
import { Provider } from 'react-redux';
import store from '../../app/store';
test('renders jobstatusFilter without crashing', () => {
    const { asFragment } = render(
        <Provider store={store}>
            <JobStatusFilter />
        </Provider>
    )
})