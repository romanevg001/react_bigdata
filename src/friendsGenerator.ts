
export class UnionFind {
    parent;
    rank;
    constructor(sizeOrfriends) {
        if( typeof sizeOrfriends == 'number') {

            this.parent = Array.from({ length: sizeOrfriends }, (_, index) => index);
            this.rank = Array(sizeOrfriends).fill(1);
        } else {
            this.parent = sizeOrfriends.parent;
            this.rank = sizeOrfriends.rank;
        }

    }

    find(p) {
        if (this.parent[p] !== p) {
            this.parent[p] = this.find(this.parent[p]); // Сжатие путей
        }
        return this.parent[p];
    }

    union(p, q) {
    
        const rootP = this.find(p);
        const rootQ = this.find(q);

        if (rootP !== rootQ) {
            // Объединение по рангу
            if (this.rank[rootP] > this.rank[rootQ]) {
                this.parent[rootQ] = rootP;
            } else if (this.rank[rootP] < this.rank[rootQ]) {
                this.parent[rootP] = rootQ;
            } else {
                this.parent[rootQ] = rootP;
                this.rank[rootP] += 1; // Увеличиваем ранг
            }
        }

    }

    print() {
        console.log('parent: ',this.parent.join(', '));
        console.log('rank: ',this.rank.join(', '));
    }
}
