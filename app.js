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
        self.$parent.doc = {};
        self.$parent.schema = JSON.parse(xhr.responseText);
      }
      xhr.send()
    }
  }
});

Vue.component('vue-schema', {
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

Vue.component('json-schema-property', {
  template: '#json-schema-property'
});

var app = new Vue({
  el: '#editor',
  data: {
    schema: {}
  },
  methods: {
    output: function() {
      var jsonDOM = this.$el.querySelectorAll('[data-json]');
      var json = {};
      function accumulate(obj, dom) {
        for (var i = 0; i < dom.length; i++) {
          if (dom[i].dataset['json'] == 'kvp') {
            obj[dom[i].querySelector('label').textContent] = dom[i].querySelector('input').value;
          } else if (dom[i].dataset['json'] == 'object') {
            var legend = dom[i].querySelector('legend').textContent;
            var sub_dom = dom[i].querySelectorAll('[data-json]');
            obj[legend] = accumulate({}, sub_dom);
            i += sub_dom.length;
          }
        }
        return obj;
      }
      return document.querySelector('#output').value = JSON.stringify(accumulate(json, jsonDOM), null, "\t");
    }
  }
});
