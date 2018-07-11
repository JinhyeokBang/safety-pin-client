export default {
  signOut(v) {
    v.$session.destroy();
    v.signed = v.$session.exists();
    location.reload();
  }
}