import React from 'react';
import {useParams} from 'react-router';
import {connect} from 'react-redux';
import BasicDetail from './BasicDetail';
import {fetchTaskName} from '../redux/Actions/TaskActionName';
import {fetchTaskSuccess} from '../redux/Actions/TaskAction';
import Loader from '../loader/loader';
import './basicdetail.css';
import {API_URL} from '../../constants';
interface ParamTypes {
  taskId: string;
}

const Detail: React.FC = (props: any) => {
  console.log('0000', props);

  const [allversion, setAllversion] = React.useState([]);
  const {taskId} = useParams<ParamTypes>();
  React.useEffect(() => {
    props.fetchTaskSuccess();
    fetch(`${API_URL}/resource/${taskId}/versions`)
      .then((response) => response.json())
      .then((data) => setAllversion(data.versions));
    // eslint-disable-next-line
  }, []);


  if (props.TaskData) {
    // let temp string;
    for (let i = 0; i < props.TaskData.length; i++) {
      if (props.TaskData[i].id === Number(taskId)) {
        const x = [{
          'id': 4,
          'version': '0.1',
          'rawURL': 'https://raw.githubusercontent.com/tektoncd/catalog/master/task/aws-cli/0.1/aws-cli.yaml',
          'webURL': 'https://github.com/tektoncd/catalog/tree/master/task/aws-cli/0.1/aws-cli.yaml',
        }];
        return (
          < BasicDetail task={props.TaskData[i]}
            version={x}
          />
        );
      }
    }
  }

  return (
    <Loader />
  );
};
const mapStateToProps = (state: any) => ({
  TaskName: state.TaskName.TaskName,
  TaskData: state.TaskData.TaskData,
});
export default connect(mapStateToProps,
  {fetchTaskName, fetchTaskSuccess})(Detail);
