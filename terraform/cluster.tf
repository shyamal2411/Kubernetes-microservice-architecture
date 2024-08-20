resource "google_container_cluster" "kubernetes" {
  name                     = "kubernetes"
  location                 = "us-central1-c"
  remove_default_node_pool = true
  initial_node_count       = 1
}
