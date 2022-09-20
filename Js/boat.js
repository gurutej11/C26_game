class Boat{
    constructor (x, y, width, hight, bodypos) {
        this.body = Bodies.rectangle (x, y, width, hight)
        this.width = width
        this.hight = hight
        this.bodypos = bodypos
        this.image = loadImage("assets/boat.png")
        World.add(world, this.body)
    }

    remove(index){
        setTimeout(() => {
            Matter.World.remove(world, this.body)
            delete boats[index]
        }, 2000)
    }

    display () {
        var pos = this.body.position
        var angle = this.body.angle
        push()
        translate(pos.x, pos.y)
        rotate(angle)
        imageMode(CENTER)
        image(this.image, 0, this.bodypos, this.width, this.hight)
        pop()
    }
}
