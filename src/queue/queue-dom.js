const queueUL = document.querySelector('.list-queue');
const queueInput = document.querySelector('.queue-input');
const warningTopQueue = document.querySelector('#queue-container .warning-top');
const warningBottomQueue = document.querySelector(
  '#queue-container .warning-bottom'
);
const addQueue = document.querySelector('.btn-add-queue');
const dequeue = document.querySelector('.btn-take-dequeue');

const queue = new Queue();

const clearQueueInput = () => {
  const input = document.getElementById('queue-input');
  input.value = null;
};

const generateListQueue = () => {
  const size = queue.MAX_SIZE;
  const queueControl = queue.queueControl;
  const ulQueue = document.getElementById('queue-list');

  ulQueue.innerHTML = '';

  for (let i = 0; i < queueControl.length; i++) {
    const li = document.createElement('li');

    li.setAttribute('class', 'active');
    li.innerHTML = queueControl[i];
    ulQueue.prepend(li);
  };

  for (let i = 0; i < size - queueControl.length; i++) {
    const li = document.createElement('li');

    li.setAttribute('class', 'inactive');
    li.innerHTML = '&nbsp';
    ulQueue.appendChild(li);
  }
};

generateListQueue();

const generateWarningQueue = (type) => {
  if (type === 'overflow') {
    warningTopQueue.style.display = 'block';
    warningTopQueue.innerHTML = type;
  } else if (type === 'underflow') {
    warningBottomQueue.style.display = 'block';
    warningBottomQueue.innerHTML = type;
  }
};

const addToQueue = () => {
  try {
    const item = document.getElementById('queue-input').value;

    if (item) {
      queue.enqueue(item);
    } else {
      queue.enqueue("");
    }

    if (warningBottomQueue.style.display === 'block') warningBottomQueue.style.display = 'none';

    clearQueueInput();
    generateListQueue();
  } catch (error) {
    generateWarningQueue('overflow');
  }
};

const removeFromQueue = () => {
  try {
    queue.dequeue();

    if (warningTopQueue.style.display === 'block') warningTopQueue.style.display = 'none';

    generateListQueue();
  } catch (error) {
    generateWarningQueue('underflow');
  }
};

addQueue.addEventListener('click', addToQueue);
dequeue.addEventListener('click', removeFromQueue);
