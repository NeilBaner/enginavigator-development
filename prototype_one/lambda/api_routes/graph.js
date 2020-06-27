class Graph {
    constructor(){
        nodes = [];
        edges = [];
    }
    addNode(node){
        nodes[node.id] = node;
    }
    addEdge(edge){
        edges[edge.start].push(edge);
    }
    dijkstra(start, end){
        
    }
}

class PriorityQueue {
    constructor() {
        queue = [];
        size = 0;
    }
    bubbleUp(index) {
        let current = index;
        while (queue[current].weight < queue[(current / 2) - 1].weight) {
            let temp = queue[current];
            queue[current] = queue[(current / 2) - 1];
            queue[(current / 2) - 1] = temp;
            current = (current / 2) - 1;
        }
    }
    bubbleDown(index) {
        let current = index;
        while (queue[current].weight > queue[(current * 2) + 1].weight || queue[current].weight > queue[(current * 2) + 2].weight) {
            if (queue[(current * 2) + 1].weight > queue[(current * 2) + 2].weight) {
                let temp = queue[current];
                queue[current] = queue[(current * 2) + 1];
                queue[(current * 2) + 1] = temp;
                current = (current * 2) + 1;
            } else {
                let temp = queue[current];
                queue[current] = queue[(current * 2) + 2];
                queue[(current * 2) + 2] = temp;
                current = (current * 2) + 2;
            }
        }
    }
    enqueue(node) {
        queue[size] = node;
        this.bubbleUp(size);
        size++;
    }
    dequeue() {
        let toReturn = queue[0];
        size--;
        queue[0] = queue[size];
        queue[size] = null;
        this.bubbleDown(0);
        return toReturn;
    }
}