import * as THREE from 'three';

export class AvatarRenderer {
  private container: HTMLElement | null = null;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private avatar: THREE.Mesh | null = null;
  private currentExpression: string = 'idle';

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  }

  public inject() {
    // Create container for avatar
    this.container = document.createElement('div');
    this.container.id = 'ai-assistant-avatar';
    this.container.className = 'ai-assistant-avatar-container';
    
    // Setup renderer
    this.renderer.setSize(200, 200);
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // Add to page
    document.body.appendChild(this.container);

    // Setup scene
    this.setupScene();
    this.animate();

    console.log('Avatar injected into page');
  }

  private setupScene() {
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    // Create simple avatar placeholder (sphere for now)
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0x4a90e2,
      metalness: 0.3,
      roughness: 0.4,
    });

    this.avatar = new THREE.Mesh(geometry, material);
    this.scene.add(this.avatar);

    // Position camera
    this.camera.position.z = 3;
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    // Gentle idle animation
    if (this.avatar && this.currentExpression === 'idle') {
      this.avatar.rotation.y += 0.005;
      this.avatar.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }

    this.renderer.render(this.scene, this.camera);
  };

  public setExpression(expression: string) {
    console.log(`Setting avatar expression to: ${expression}`);
    this.currentExpression = expression;
    // TODO: Implement expression animations
  }

  public show() {
    if (this.container) {
      this.container.style.display = 'block';
    }
  }

  public hide() {
    if (this.container) {
      this.container.style.display = 'none';
    }
  }
}