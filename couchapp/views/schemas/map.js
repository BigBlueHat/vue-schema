function(doc) {
  if (doc._id.substr(-6) == 'schema') {
    emit(null, 1);
  }
}
