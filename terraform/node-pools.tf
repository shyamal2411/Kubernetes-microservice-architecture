resource "google_container_node_pool" "default-pool" {
  name       = "default-pool"
  cluster    = google_container_cluster.kubernetes.id
  node_count = 1

  node_config {
    machine_type = "e2-standard-2"
    disk_size_gb = 10
    disk_type    = "pd-standard"
    image_type   = "cos_containerd"

  }
}
