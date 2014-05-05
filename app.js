var schema = {
  "title": "Example Schema",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "age": {
      "description": "Age in years",
      "type": "integer",
      "minimum": 0
    }
  },
  "required": ["firstName", "lastName"]
};

var app = new Vue({
  el: '#editor',
  data: {
    schema: schema
  },
  created: function () {
    this.$el.getElementsByClassName('schema')[0].value
      = JSON.stringify(this.schema, null, "\t");
  },
  methods: {
    updateSchema: function(e) {
      console.log(e.target.value);
      e.targetVM.schema = JSON.parse(e.target.value);
    }
  },
  computed: {
    output: {
      $get: function() {
        var self = this;
        var rv = {};
        var keys = Object.keys(self.schema.properties);
        keys.forEach(function(key) {
          rv[key] = self.schema.properties[key].value;
        });
        return JSON.stringify(rv, null, "\t");
      }
    }
  },
  filters: {
    pretty: function(value) {
      return JSON.stringify(value, null, "\t");
    },
    input_type: function(value) {
      var types = {
          string: 'text',
          integer: 'number'
      }
      return types[value];
    }
  }
});
