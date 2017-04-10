function Hash() {
  this._size = 8;
  this._load = 0;
  this._storage = new Array(this._size);
}

/*Modified hash function for quadratic probing*/
Hash.prototype._hashFunc = function(str, max, probe) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let letter = str[i];
    hash = (hash << 5) + letter.charCodeAt(0);
    hash = ((hash & hash) * Math.pow(probe, 2)) % max;
  }
  return hash;
};

Hash.prototype._resize(size) {
  const old = this._storage.slice();
  this._storage = new Array(size);
  this._size = size;
  for (let i = 0; i < old.length; i++) {
    if (old[i]) {
      this.insert(old[i][0], old[i][1]);
    }
  }
}

Hash.prototype.insert(key, value) {
  let inserted = false;
  let i;
  let j = 0;
  /*Resize when load exceeds 50% of storage size*/
  if (((this._load  + 1) / this._size) < .5) {
    this._resize(this._size * 2);
  }

  while(!inserted) {
    i = this._hashFunc(key, this._size, j++);
    if (!this._storage[i]) {
      this._storage[i] = [key, value];
    }
    inserted = true;
  }
}

/*Replaces key-value pair with null and returns the deleted pair. Returns -1 if key not in hash table*/
Hash.prototype.delete(key) {
  let location;
  let i = 0;
  var pair;

  if (((this._load  - 1) / this._size) < .10) {
    this._resize(this._size / 2);
  }

  while (i < this._size) {
    location = this._hashFunc(key, this._size, i++);
    if (location === undefined) {
      return -1;
    } else if (location !== null) {
      if (location[0] === key) {
        pair = location;
        location = null;
        return location
      }
    }
  }

  return -1
}

/*Returns key argument's value or -1 if key not in hash table*/
Hash.prototype.retrieve(key) {
  let location;
  let i = 0;
  
  /*Probe memory address for matching keys, continue until found or address is undefined*/
  while (i < this._size) {
    location = this._hashFunc(key, this._size, i++);
    if (location === undefined) {
      return -1;
    } else if (location !== null) {
      if (location[0] === key) {
        return location[1];
      }
    }
  }
  
  return -1;
}