//http://airbnb.io/enzyme/
//all of these are present in documentation
import { configure } from 'enzyme';
import Adaptar from 'enzyme-adapter-react-16';

configure({ adapter: new Adaptar() });