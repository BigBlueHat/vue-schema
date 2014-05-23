Vue.component('json-textarea', {
  template: '{{content}}',
  created: function() {
    this.$watch('content', function () {
      this.$el.value = JSON.stringify(this.content, null, 2);
    });
  },
  methods: {
    updateSchema: function(e) {
      e.targetVM.content = JSON.parse(e.target.value);
    }
  }
});

Vue.component('schema-links', {
  data: {
    links: {
      "Example Schema": "schemas/example.schema.json",
      "Address": "schemas/address.schema.json",
      "Calendar": "schemas/calendar.schema.json",
      "Card": "schemas/card.schema.json",
      "Geo": "schemas/geo.schema.json",
      "Hyper-schema": "schemas/hyper-schema.schema.json",
      "Interfaces": "schemas/interfaces.schema.json",
      "JSON-Ref": "schemas/json-ref.schema.json",
      "Schema": "schemas/schema.schema.json"
    }
  },
  methods: {
    setHref: function(e) {
      e.preventDefault();

      var xhr = new XMLHttpRequest(),
          self = this;
      xhr.open('GET', e.target.getAttribute('href'));
      xhr.onload = function () {
        self.$parent.schema = JSON.parse(xhr.responseText);
      }
      xhr.send()
    }
  }
});

Vue.component('json-schema-property', {
  template: '#json-schema-property'
});

var app = new Vue({
  el: '#editor',
  data: {
    schema: {},
    doc: {}
  },
  computed: {
    output: {
      $get: function() {
        return JSON.stringify(this.doc, null, "\t");
      }
    }
  },
  filters: {
    input_type: function(value) {
      var types = {
          string: 'text',
          integer: 'number'
      }
      return types[value];
    }
  }
});
